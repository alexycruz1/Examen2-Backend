var person = require('../schemas/person');
var boom = require('boom');
var bcrypt = require('bcrypt');

exports.createPerson = {
	handler: function (request, reply) {
		bcrypt.hash(request.payload.password, 10, function (err, hash) {
			if (err)
				return reply(boom.notAcceptable('Error encrypting password'));
			var verifyUsername = request.payload.username;
			var unique = true;

			person.find({}, 'IDPerson username', function (err, IDP) {
				if (!err) {
					var ID = 0;
					for (var i = 0; i < IDP.length; i++) {
						if (verifyUsername === IDP[i].username) {
							unique = false;
						}
					}
					if (IDP[0] === undefined) {
						ID = 1;
					} else {
						ID = IDP[0].IDPerson + 1;
					}
					var newPerson = new person({
						IDPerson: ID,
						username: request.payload.username,
						password: hash,
						scope: request.payload.scope,
						name: request.payload.name,
						age: request.payload.age,
						listOfPets: request.payload.listOfPets
					});

					if (unique) {
						newPerson.save();
						reply('Person saved');
					} else {
						reply('Not unique');
					}
				} else {
					reply('Error');
				}
			}).sort({ _id: -1 });
		});
	}
};

exports.getPeople = {
	handler: function (request, reply) {
		var People = person.find({});
		return reply(People);
	}
};

exports.editPerson = {
	handler: function (request, reply) {
		var Person = person.find({ IDPerson: request.params.IDPerson });
		Person.update({ $set: request.payload }, function (err) {
			if (err) {
				reply('Error');
			} else {
				reply('Person edited');
			}
		});
	}
};

exports.deletePerson = {
	handler: function (request, reply) {
		var personByID = person.findOne({ IDPerson: request.params.IDPerson });
		personByID.remove(function (err) {
			if (err) {
				reply('not deleted');
			} else {
				reply('deleted');
			}
		})
	}
};

exports.getPersonByID = {
	handler: function (request, reply) {
		var personByID = person.find({ IDPerson: request.params.IDPerson });
		return reply(personByID);
	}
};

exports.addPetToPerson = {
	handler: function (request, reply) {
		var pets = person.find({ IDPerson: request.params.IDPerson });
		pets.update({ $push: { listOfPets: request.payload.listOfPets } }, function (err) {
			if (err) {
				reply('Error');
			} else {
				reply('pet added to person');
			}
		});
	}
};

exports.deletePetFromPerson = {
	handler: function (request, reply) {
		var pets = person.find({ IDPerson: request.params.IDPerson });
		pets.update({ $pull: { listOfPets: request.payload.listOfPets } }, function (err) {
			if (err) {
				reply('Error');
			} else {
				reply('pet deleted from person');
			}
		});
	}
};

exports.addFriend = {
	handler: function (request, reply) {
		var friends = person.find({ IDPerson: request.params.IDPerson });
		friends.update({ $push: { listOfFriends: request.payload.listOfFriends } }, function (err) {
			if (err) {
				reply('Error');
			} else {
				reply('Person added to friends');
			}
		});
	}
};

exports.deleteFriend = {
	handler: function (request, reply) {
		var friends = person.find({ IDPerson: request.params.IDPerson });
		friends.update({ $pull: { listOfFriends: request.payload.listOfFriends } }, function (err) {
			if (err) {
				reply('Error');
			} else {
				reply('person deleted from friends');
			}
		});
	}
};