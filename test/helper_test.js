const mongoose = require('mongoose');

before((done) => {
	
	mongoose.connect('mongodb://localhost/driverTest', { useNewUrlParser: true, useUnifiedTopology : true, useFindAndModify : false });		
	mongoose.connection
	.once('open', () => {
		console.log('DB-Test Connected\n');
	})
	.on('err', () => {
		console.log(err);
	});
	done();
});


beforeEach((done) => {
	mongoose.connection.collections.drivers.drop((err) => {
		
		mongoose.connection.collections.drivers.ensureIndex({ 'geometry.coordinates' : '2dsphere' })
			.then(() => {
				console.log('Dropped \'driver\' collection\n');
				done();
			})
	});
});
