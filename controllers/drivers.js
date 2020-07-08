const Driver = require('../models/driverModel');
const Cust = require('../models/custModel');
const Trip = require('../models/tripModel');
const assert = require('assert');
const passport = require('../passport/passport');
const bcrypt = require('bcryptjs');

module.exports = {

	greeting : function(req, res){

		if(req.session.viewCount)
		{
			req.session.viewCount++;
		}
		else
			req.session.viewCount = 1;

		res.render('home', { PV : req.session.viewCount });
	},

	finding : function(req, res, next) {

		const {lng, lat} = req.query;
		const toFind = [parseFloat(lng), parseFloat(lat)];
		console.log('Finding Near : [' + parseFloat(lng) + ' , ' + parseFloat(lat) + ']');
		
		/*
		Driver.find({ 
			geometry: { 
				$near : { 
					$geometry : {
						type : "Point",
						coordinates : toFind
					},
					$minDistance : 0,
					$maxDistance : 200000
				}
			}
		})
		.then((doc) => {
		 	console.log('Found ' + doc.length + ' driver(s)');
		 	res.send(doc);
		})
		.catch(next);
		*/
		Cust.find({ 
			from: { 
				$geoWithin : { 
					$centerSphere : [ toFind, 125/3963.2 ]
				}
			}
		})
		.then((doc) => {
		 	console.log('Found ' + doc.length + ' customer(s)');
		 	req.session.nearby = doc;
		 	res.redirect('/driver');
		})
		.catch(next);
	},

	createD : function(req, res, next){
		
		//req.body has newUsers' info
		Driver.findOne({email : req.body.email})
			.then((driver) =>{
				
				if(driver)
				{
					console.log('Email ID already in use');
					res.redirect('/signup/d');
				}	
				else
				{
					const newD = new Driver(req.body);

					bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newD.password, salt)
							.then((hash) => {

								newD.password = hash;
								newD.save()
									.then((d) => {
										console.log('Added ');
										console.log(d + '\n');
										res.redirect('/login/d');
									})
									.catch(next);
							})
							.catch(next));
				}

			});

		//res.redirect('/driver');
	},

	createC : function(req, res, next){
		
		//req.body has newUsers' info
		Cust.findOne({email : req.body.email})
			.then((cust) =>{
				
				if(cust)
				{
					console.log('Email ID already in use');
					res.redirect('/signup/c');
				}	
				else
				{
					const newC = new Cust({email : req.body.email, name : req.body.name, from : {coordinates : [req.body.fromlng,req.body.fromlat]}, to : { coordinates : [req.body.tolng,req.body.tolat] }});

								newC.save()
									.then((d) => {
										console.log('Added Cust : ');
										console.log(d + '\n');
										res.redirect('/');
									})
									.catch(next);
				}

			})
			.catch(next);

		//res.redirect('/driver');
	},

	edit : function(req, res, next) {

		var _id = req.params.id;
		var changeTo = req.params.changeTo;
		if(changeTo == 'true')
			changeTo = false;
		else
			changeTo = true;
		req.user.driving = changeTo;
		console.log(req.params.id);
		Driver.findByIdAndUpdate(_id, {driving : changeTo})
			.then((d) => {
				console.log('Updated Driving status of : ' + d.email + '\n');
				req.session.nearby = [];
				res.redirect('/driver');
			})
			.catch(next);
	},

	del : function(req, res, next) {

		var _id = req.params.id;
		Driver.findByIdAndDelete(_id)
			.then((d) => {
				console.log('Deleted Driver : ' + d.email + '\n');
				res.send('Driver Deleted');
			})
			.catch(next);	
	},

	loginDview : function(req, res) {

		console.log('At driver login page');
		res.render('logDin');

	},	

	loginD : function(req, res, next) {

		passport.authenticate('local', { 
		    successRedirect: '/driver', 
		    failureRedirect: '/login/d', 
		    failureFlash: true
		  })(req,res,next);

	},

	logout : function(req, res, next) {

		console.log(req.originalUrl);

		Driver.findByIdAndUpdate(req.user._id, {driving : false})
			.then(() => {
				req.user = null;
				req.logout();
				res.redirect('/');
			})

	},

	signDup : function(req, res, next) {

		res.render('signDup');

	},

	signCup : function(req, res, next) {

		res.render('signCup');

	},

	driver : function(req, res, next) {
		
		var near = req.session.nearby;
		if(near == null)
			near = []
		Driver.findById(req.user.id)
			.then((driver) => {
				req.drivingStatus = req.user.driving;
				res.render('driver', {nearby : near });
			})
			.catch(next);
		//res.render('driverHP');

	},

	startT : function(req, res, next) {
		
		console.log(Number(req.params.no));
		
		var drivee = req.session.nearby[Number(req.params.no)];
		const from = '(' + drivee.from.coordinates[0] + ',' + drivee.from.coordinates[1] + ')' ;
		const to = '(' + drivee.to.coordinates[0] + ',' + drivee.to.coordinates[1] + ')' ;

		const curTrip = new Trip({ from : drivee.from, to : drivee.to, driver : req.user, drivee : drivee });
		req.session.curRider = drivee;
		console.log('Current Trip Details : ');
		curTrip.save()
			.then((x) => {
				
				Driver.findByIdAndUpdate(req.user._id, { $push : {trips : curTrip} })
					.then(() => {
							console.log('User IS : ');
							console.log(req.user);
							res.redirect('/driver/ongoing');		
					})
					.catch(next);
			})
			.catch(next);
	},

	endT : function(req, res, next) {

				Cust.findByIdAndDelete(req.session.curRider._id)
					.then(() => {
						req.session.nearby = [];
						req.session.curRider = null;
						res.redirect('/driver');
					})
					.catch(next);
	},

	ongoing : function(req, res, next) {
		res.render('curTrip', {tripDetails : req.session.curRider});
	}
};