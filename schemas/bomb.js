var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var bombSchema = new mongoose.Schema({
    IDBomb: Number,
    weight: Number,
    type: Boolean,
    detonated: Boolean,
    detonatedPlace: String,
    energy: Number
});

bombSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Bomb', bombSchema);