var bomb = require('../schemas/bomb');
var boom = require('boom');
var bcrypt = require('bcrypt');

exports.createBomb = {
    handler: function (request, reply) {
        var unique = true;

        bomb.find({}, 'IDBomb', function (err, IDB) {
            if (!err) {
                var ID = 0;

                if (IDB[0] === undefined) {
                    ID = 1;
                } else {
                    ID = IDB[0].IDBomb + 1;
                }
                var newBomb = new bomb({
                    IDBomb: ID,
                    weight: request.payload.weight,
                    type: request.payload.type,
                    detonated: request.payload.detonated,
                    detonatedPlace: request.payload.detonatedPlace,
                    energy: request.payload.energy
                });

                if (unique) {
                    newBomb.save();
                    reply('Bomb saved');
                } else {
                    reply('Not unique');
                }
            } else {
                reply('Error');
            }
        }).sort({ _id: -1 });
    }
};

exports.getBombs = {
    handler: function (request, reply) {
        var Bombs = bomb.find({});
        return reply(Bombs);
    }
};

exports.editBomb = {
    handler: function (request, reply) {
        var Bomb = bomb.find({ IDBomb: request.params.IDBomb });
        Bomb.update({ $set: request.payload }, function (err) {
            if (err) {
                reply('Error');
            } else {
                reply('Bomb edited');
            }
        });
    }
};

exports.deleteBomb = {
    handler: function (request, reply) {
        var bombByID = bomb.findOne({ IDBomb: request.params.IDBomb });
        bombByID.remove(function (err) {
            if (err) {
                reply('not deleted');
            } else {
                reply('deleted');
            }
        })
    }
};

exports.getBombByID = {
    handler: function (request, reply) {
        var bombByID = bomb.find({ IDBomb: request.params.IDBomb });
        return reply(bombByID);
    }
};