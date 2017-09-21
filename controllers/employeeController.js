var employee = require('../schemas/employee');
var boom = require('boom');
var bcrypt = require('bcrypt');

exports.createEmployee = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {
		bcrypt.hash(request.payload.password, 10, function (err, hash) {
			if (err)
				return reply(boom.notAcceptable('Error encrypting password'));
			var verifyUsername = request.payload.username;
			var unique = true;

			employee.find({}, 'IDEmployee username', function (err, IDP) {
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
						ID = IDP[0].IDEmployee + 1;
					}
					var newEmployee = new employee({
						IDEmployee: ID,
						username: request.payload.username,
						password: hash,
						scope: request.payload.scope,
						name: request.payload.name,
						age: request.payload.age,
					});

					if (unique) {
						newEmployee.save();
						reply('Employee saved');
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

exports.getEmployees = {
	auth: {
		mode: 'required',
		strategy: 'session',
		scope: ['admin', 'regular']
	},
	handler: function (request, reply) {
		var Employees = employee.find({});
		return reply(Employees);
	}
};

exports.editEmployee = {
	auth: {
		mode: 'required',
		strategy: 'session',
		scope: ['admin']
	},
	handler: function (request, reply) {
		var Employee = employee.find({ IDEmployee: request.params.IDEmployee });
		Employee.update({ $set: request.payload }, function (err) {
			if (err) {
				reply('Error');
			} else {
				reply('Employee edited');
			}
		});
	}
};

exports.deleteEmployee = {
	auth: {
		mode: 'required',
		strategy: 'session',
		scope: ['admin']
	},
	handler: function (request, reply) {
		var employeeByID = employee.findOne({ IDEmployee: request.params.IDEmployee });
		employeeByID.remove(function (err) {
			if (err) {
				reply('not deleted');
			} else {
				reply('deleted');
			}
		})
	}
};

exports.getEmployeeByID = {
	auth: {
		mode: 'required',
		strategy: 'session',
		scope: ['admin', 'regular']
	},
	handler: function (request, reply) {
		var employeeById = employee.find({ IDEmployee: request.params.IDEmployee });
		return reply(employeeById);
	}
};