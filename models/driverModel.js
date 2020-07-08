const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const PointSchema = require('./pointSchema');

const DriverSchema = new mongoose.Schema({

	email : {
		type : String,
		required : true
	},

	password : {
		type : String,
		required : true
	},

	driving : {
		type : Boolean,
		default : false
	},
	geometry : {
		type : PointSchema,
		index : "2dsphere",
		default : { type : 'Point', coordinates : [10,20] }
	},
	trips : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'trip'		
	}]

});

DriverSchema.virtual('tripCount').get(function(){
	return this.trips.length;
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;