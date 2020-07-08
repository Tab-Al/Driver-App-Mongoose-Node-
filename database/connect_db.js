const mongoose = require('mongoose');

// ---------------------------------------------------------------------------------

// setting up DATABASE
mongoose.Promise = global.Promise;
const MongoAtlasURI = 'mongodb+srv://tab_al:%23Qwerty1234@cluster0-obgzq.mongodb.net/driverApp?retryWrites=true&w=majority';
if(process.env.NODE_ENV !== 'test')
{
	mongoose.connect(MongoAtlasURI, { useNewUrlParser: true, useUnifiedTopology : true, useFindAndModify: false })
		.catch(()=>{
			console.log('error aaya');
		});

	mongoose.connection
	.once('open', () => {
		console.log('DB-Prod Connected\n');
	})
	.on('err', (err) => {
		console.log('error aaya');
		console.log(err);
	});
}

module.exports = mongoose.connection;

// ---------------------------------------------------------------------------------

// not placing test connection in else becasue sometimes mocha will start running tests before the connection is made
// causing all test to fail
// hence better to define test connection in before() in test_helper so that no test is started until connection made
/*
else
{
	mongoose.connect('mongodb://localhost/driverTest');		
	mongoose.connection
	.once('open', () => {
		console.log('DB-Test Connected');
	})
	.on('err', () => {
		console.log(err);
	});	
}
*/

// ---------------------------------------------------------------------------------