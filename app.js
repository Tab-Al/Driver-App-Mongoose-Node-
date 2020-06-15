const express = require('express');
const bodyParser = require('body-parser');
const crud = require('./routes/crud');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

mongoose.Promise = global.Promise;
const MongoAtlasURI = 'mongodb+srv://tab_al:%23Qwerty1234@cluster0-obgzq.mongodb.net/driverApp?retryWrites=true&w=majority';
if(process.env.NODE_ENV !== 'test')
{
	mongoose.connect(MongoAtlasURI, { useNewUrlParser: true, useUnifiedTopology : true, useFindAndModify: false });

	mongoose.connection
	.once('open', () => {
		console.log('DB-Prod Connected\n');
	})
	.on('err', () => {
		console.log(err);
	});
}
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

// use CRUD route
//app.use('/crud', require('./routes/crud'));
crud(app);

// middleware (error-handler)
app.use((err, req, res, next) => {

	// err will be defined if the previous middleware threw an error
	res.status(404).send({error : err._message});
	// req is incoming request object
	// res is the outoging response object
	// next calls the next middleware in line
});

// for all residual cases
//app.get('*', (req,res,next)=>{
  //res.send({404 : 'Unavailable'});
//})

// start listening
app.listen(3050, () => {
	console.log('Listening at 3050 Port\n');
});

module.exports = app;