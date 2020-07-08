/*

const route = require('express').Router();

route.get('/', (req, res) => {
	console.log('/ is called');
	res.send({ Hello : 'There' });
});

module.exports = route;

*/

const DriversController = require('../controllers/drivers');
const checkAuth = require('../passport/authenticate');
// directly export a function
module.exports = function(app) {

	app.get('/', DriversController.greeting);
	// instead of making a controller and call it's function we can directly provide function here	

	app.post('/crud/create/d', DriversController.createD);
	app.post('/crud/create/c', DriversController.createC);

	//app.put('/crud/edit/:id', DriversController.edit);
	app.get('/crud/edit/:id/:changeTo', DriversController.edit);

	app.delete('/crud/del/:id', DriversController.del);

	app.get('/crud/finding', DriversController.finding);

	app.get('/login/d', DriversController.loginDview);
	app.post('/login/d', DriversController.loginD);
	app.get('/logout', DriversController.logout);

	app.get('/signup/d', DriversController.signDup);
	app.get('/signup/c', DriversController.signCup);

	app.get('/driver', checkAuth, DriversController.driver);

	app.get('/driver/startT/:no', checkAuth, DriversController.startT);
	app.get('/driver/endT', checkAuth, DriversController.endT);
	app.get('/driver/ongoing', DriversController.ongoing);

};