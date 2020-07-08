const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const PointSchema = require('./pointSchema');

const CustSchema = new mongoose.Schema({

	email : {
		type : String,
		required : true
	},

	name : {
		type : String,
		required : true
	},

	from : {
		type : PointSchema,
		index : "2dsphere",
	},

	to : {
		type : PointSchema,
		index : "2dsphere"
	}

});

const CustModel = mongoose.model('cust', CustSchema);

module.exports = CustModel;