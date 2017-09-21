var pet = require('../schemas/pet');

exports.createPet = {
    handler: function (request, reply) {
        var unique = true;

        pet.find({}, 'IDPet', function (err, IDP) {
            if (!err) {
                var ID = 0;
                if (IDP[0] === undefined) {
                    ID = 1;
                } else {
                    ID = IDP[0].IDPet + 1;
                }
                var newPet = new pet({
                    IDPet: ID,
                    name: request.payload.name,
                    owner: request.payload.owner,
                    available: request.payload.available
                });

                newPet.save();
            } else {
                reply('Error');
            }
        }).sort({ _id: -1 });
    }
};

exports.getPets = {
    handler: function (request, reply) {
        var Pets = pet.find({});
        return reply(Pets);
    }
};

exports.editPet = {
    handler: function (request, reply) {
        var Pet = pet.find({ IDPet: request.params.IDPet });
        Pet.update({ $set: request.payload }, function (err) {
            if (err) {
                reply('Error');
            } else {
                reply('Pet edited');
            }
        });
    }
};

exports.deletePet = {
    handler: function (request, reply) {
        var petByID = pet.findOne({ IDPet: request.params.IDPet });
        petByID.remove(function (err) {
            if (err) {
                reply('not deleted');
            } else {
                reply('deleted');
            }
        })
    }
};

exports.getPetByID = {
    handler: function (request, reply) {
        var petById = pet.find({ IDPet: request.params.IDPet });
        return reply(petById);
    }
};