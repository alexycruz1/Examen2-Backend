var joi = require('joi');
var boom = require('boom');
var person = require('../schemas/person');
var bcrypt = require('bcrypt');

exports.login = {
    auth: false,
    validate: {
        payload: {
            username: joi.string().required(),
            password: joi.string().required()
        }
    },
    handler: function (request, reply) {
        console.log(request.payload.password);
        person.find({ username: request.payload.username }, function (err, person) {
            console.log('username: ', request.payload.username, 'person', person)
            if (err)
                return reply(boom.notAcceptable('Error Executing Query'));
            if (person.length > 0) {
                bcrypt.compare(request.payload.password, person[0].password, function (err, res) {
                    console.log('res', res);
                    if (err)
                        return reply(boom.unauthorized('Wrong email'));
                    if (res) {
                        console.log('before setting cookie');
                        request.cookieAuth.set(person[0]);
                        console.log('after setting cookie');
                        return reply({ username: person[0].username, scope: person[0].scope });
                    } else {
                        return reply(boom.unauthorized('Wrong password'));
                    }
                });
            }
        });
    }
};

exports.logout = {
    auth: {
        mode: 'required',
        strategy: 'session'
    },
    handler: function (request, reply) {
        request.cookieAuth.clear();
        return reply('Logout Successful!');
    }
};