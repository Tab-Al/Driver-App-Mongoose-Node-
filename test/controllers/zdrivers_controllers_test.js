const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe("Checking Express' App", () => {

	it('handling POST Create request', (done) => {

		Driver.countDocuments()
			.then((c) => {

				request(app)
					.post('/crud/create')
					.send({email : 'test@gmail.com'})
					.end((err, response) => {
						
						Driver.countDocuments()
							.then((newC) => {
								console.log('Create Done\n');
								assert(c + 1 === newC);
								done();
							});

					});

			});
		
	});

	it('handling PUT Edit request', (done) => {

		const newD = new Driver({ email : 'tab@gmail.com' });
		newD.save()
			.then(() => {
				request(app)
					.put('/crud/edit/' + newD._id)
					.send({ up : {driving : 'true'} })
					.end((err, response) => {
						
						Driver.findById(newD._id)
							.then((d) => {
								console.log('Edited Driving status of : ' + d.email + '\n');
								assert(d.driving === true);
								done();		
							});
						
					});
			});

	});

	it('handling DELETE del request', (done) => {

		const newD = new Driver({ email : 'tab@gmail.com' });
		newD.save()
			.then(() => {
				request(app)
					.delete('/crud/del/' + newD._id)
					.end(() => {
						
						Driver.findById(newD._id)
							.then((d) => {
								assert(d === null);
								done();		
							});
						
					});
			});

	});

	/*
	it('handling GET Find request', (done) => {

		const sD = new Driver({ email : 'seattle@gmail.com', geometry : { type : 'Point', coordinates: [-122.4759902, 47.6147628] } });
		const mD = new Driver({ email : 'miami@gmail.com', geometry : { type : 'Point', coordinates: [-80.253, 25.791] } });
		
		Promise.all([sD.save(), mD.save()])
			.then(() => {
				request(app)
					.get('/crud/finding?lng=-80&lat=25')
					.end((err, response) => {
						console.log(response);
						done();
					})
			});

	});
	*/
	it.only('handling GET Find request', (done) => {

		const sD = new Driver({ email : 'seattle@gmail.com', geometry : { type : 'Point', coordinates: [-122.4759902, 47.6147628] } });
		const xD = new Driver({ email : 'loda@gmail.com', geometry : { type : 'Point', coordinates: [-80.4759902, 25.6147628] } });
		const mD = new Driver({ email : 'miami@gmail.com', geometry : { type : 'Point', coordinates: [-80.253, 25.791] } });
		
		Promise.all([sD.save(), mD.save(), xD.save()])
			.then(() => {
				setTimeout( ()=>{
					request(app)
					.get('/crud/finding?lng=-80&lat=25')
					.end((err, response) => {
						console.log(response.body);
						done();
					});
				},1500);
				
			});

	});

});