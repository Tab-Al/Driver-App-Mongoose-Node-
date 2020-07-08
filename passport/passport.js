const passport = require('passport');
const strategies = require('./strategies');
const connection = require('../database/connect_db');
const Driver = connection.model('driver');

passport.use(strategies.ls);


// its job to determine what data from the user object should be stored in the session. 
// The result of the serializeUser method is attached to the session as req.session.passport.user
// invoked during authentication
passport.serializeUser((driver, done) => {
	done(null, driver.id);
});

// finds user with id and attach it to req.user
passport.deserializeUser((id, done) => {
	Driver.findById(id)
		.then((driver) => {
			done(null, driver);
		})
		.catch((err) => {
			done(err);
		});
});

module.exports = passport;