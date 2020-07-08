const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
	type : {
		type : String,
		default : 'Point'
	},
	coordinates : {
		type : [Number],
		default : [10,20]
	}
});

module.exports = PointSchema;