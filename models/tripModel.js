
const mongoose = require('mongoose');
const PointSchema = require('./pointSchema');

const TripSchema = new mongoose.Schema({

	from : {
		type : PointSchema,
		index : '2dsphere',
		required : true
	},

	to : {
		type : PointSchema
	},

	driver : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'driver',
		required : true
	},

	drivee : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'cust',
		required : true	
	}

});

const TripModel = mongoose.model('trip', TripSchema);

module.exports = TripModel;