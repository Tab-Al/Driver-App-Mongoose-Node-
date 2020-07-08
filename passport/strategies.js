const LocalStrategy = require('passport-local').Strategy;
const connection = require('../database/connect_db');
const Driver = connection.model('driver');
const bcrypt = require('bcryptjs');

const ls = new LocalStrategy({ usernameField: 'email' }, function(email, password, done){
  
  Driver.findOne( {email: email} )
    .then((driver) => {
      
      if(!driver){
          return done(null, false);
      }

      bcrypt.compare(password, driver.password, (err, isMatch) => {
        
        if(err) 
        	throw err;

        if(isMatch)
        {
          console.log('Logged In as ' + driver.email);
          return done(null, driver);
        }
        else
          return done(null,false);
      
      });
      
    });  

});

module.exports = { ls };