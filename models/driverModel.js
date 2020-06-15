const mongoose = require('mongoose');
const PointSchema = new mongoose.Schema({
	type : {
		type : String,
		default : 'Point'
	},
	coordinates : {
		type : [Number]
	}
});

const DriverSchema = new mongoose.Schema({

	email : {
		type : String,
		required : true
	},
	driving : {
		type : Boolean,
		default : false
	},
	geometry : {
		type : PointSchema,
		index : "2dsphere"
	}

});


const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;