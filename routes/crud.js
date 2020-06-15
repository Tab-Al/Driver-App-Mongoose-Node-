/*

const route = require('express').Router();

route.get('/', (req, res) => {
	console.log('/ is called');
	res.send({ Hello : 'There' });
});

module.exports = route;

*/

const DriversController = require('../controllers/drivers');

// directly export a function
module.exports = function(app) {

	//app.get('/crud', DriversController.greeting);
	// instead of making a controller and call it's function we can directly provide function here	

	app.post('/crud/create', DriversController.create);

	app.put('/crud/edit/:id', DriversController.edit);

	app.delete('/crud/del/:id', DriversController.del);

	app.get('/crud/finding', DriversController.finding);

	//app.get('/crud/find', DriversController.find);

};