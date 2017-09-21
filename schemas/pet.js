var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var petSchema = new mongoose.Schema({
	IDPet: Number,
    name: String,
    owner: Number,
    available: Boolean
});

petSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Pet', petSchema);