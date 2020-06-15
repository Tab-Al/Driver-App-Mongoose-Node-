const Driver = require('../models/driverModel')
const assert = require('assert');

module.exports = {

	greeting : function(req, res){
		res.send({ Hello : 'There' });
	},

	finding : function(req, res, next) {

		const {lng, lat} = req.query;
		const toFind = [parseFloat(lng), parseFloat(lat)];
		console.log('Finding : [' + parseFloat(lng) + ' , ' + parseFloat(lat) + ']');
		
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
		Driver.find({ 
			geometry: { 
				$geoWithin : { 
					$centerSphere : [ toFind, 125/3963.2 ]
				}
			}
		})
		.then((doc) => {
		 	console.log('Found ' + doc.length + ' driver(s)');
		 	res.send(doc);
		})
		.catch(next);
	},

	create : function(req, res, next){
		
		//req.body has newUsers' info

		const newD = new Driver(req.body);
		newD.save()
			.then((d) => {
				console.log('Adding ');
				console.log(d + '\n');
				res.send(d);
			})
			.catch(next);
	},

	edit : function(req, res, next) {

		var _id = req.params.id;
		//console.log('Updating : ' + _id);
		Driver.findByIdAndUpdate(_id, req.body.up)
			.then((d) => {
				console.log('Updated Driving status of : ' + d.email + '\n');
				res.send('Driving Status Updated');
			})
			.catch(next);
	},

	del : function(req, res, next) {

		var _id = req.params.id;
		//console.log('Updating : ' + _id);
		Driver.findByIdAndDelete(_id)
			.then((d) => {
				console.log('Deleted Driver : ' + d.email + '\n');
				res.send('Driver Deleted');
			})
			.catch(next);	
	}

};