const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crud = require('./routes/crud');
const connection = require('./database/connect_db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const app = express();


// ---------------------------------------------------------------------------------




// using some middlewares
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended : true}));



 
// ---------------------------------------------------------------------------------




//set up template engine
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./assets'));




// ---------------------------------------------------------------------------------




// Setting up SESSION
const sessionStore = new MongoStore({

	mongooseConnection : connection,
	collection: 'sessions'
});

app.use(session({

	secret : 'some secret',
	resave : false,
	saveUninitialized : true,
	store : sessionStore,
	cookie : {
		maxAge : 1000*60*60*24
	}

}));




// ---------------------------------------------------------------------------------




// configuring passport
// they first check if there's req.session.passport.user is there or not
// if user is not null then calls deserialize with value in req.session.passport.user,
// deserialize will attach it to req.user
app.use(passport.initialize());
app.use(passport.session());




// ---------------------------------------------------------------------------------




// making global variables
app.use((req,res,next)=>{
  res.locals.user = req.user || null;
  res.locals.session = req.session || null;
  next();
});




// ---------------------------------------------------------------------------------
// using ROUTES
// can also use app.use('/crud', require('./routes/crud'));
crud(app);




// ---------------------------------------------------------------------------------



// middleware (error-handler)
app.use((err, req, res, next) => {

	console.error(err.stack);
	// err will be defined if the previous middleware threw an error
	res.status(404).sendFile(process.cwd() + '/views/404.html');
	// req is incoming request object
	// res is the outoging response object
	// next calls the next middleware in line
});




// ---------------------------------------------------------------------------------




// for all residual cases
//app.get('*', (req,res,next)=>{
  //res.sendFile(process.cwd() + '/views/404.html');
//});


// start listening
app.listen(3080, () => {
	console.log('Listening at 3050 Port\n');
});

module.exports = app;