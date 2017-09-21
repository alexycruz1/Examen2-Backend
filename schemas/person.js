var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var personSchema = new mongoose.Schema({
	IDPerson: Number,
	username: String,
	password: String
});

personSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Person', personSchema);