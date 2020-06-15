const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe("Checking Express' App", () => {

	xit('handling GET request', (done) => {
		request(app)
			.get('/crud')
			.end((err, response) => {
				assert(response.body.Hello === 'There');
				done();
			});
	});

});