var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var employeeSchema = new mongoose.Schema({
	IDEmployee: Number,
	username: String,
	password: String,
	scope: [String],
	name: String,
	age: Number
});

employeeSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Employee', employeeSchema);