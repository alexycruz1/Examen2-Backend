var person = require('../controllers/personController');
var pet = require('../controllers/petController');
var employee = require('../controllers/employeeController');
var authentication = require('../controllers/authController');

exports.endpoints = [
	{
		method: 'GET',
		path: '/',
		config: { handler: function (request, reply) { reply('API PE2, Prueba de examen 2') } }
	},
	{
		method: 'POST',
		path: '/PE2/Person',
		config: person.createPerson
	},
	{
		method: 'PUT',
		path: '/PE2/Person/{IDPerson}',
		config: person.editPerson
	},
	{
		method: 'DELETE',
		path: '/PE2/Person/{IDPerson}',
		config: person.deletePerson
	},
	{
		method: 'GET',
		path: '/PE2/People',
		config: person.getPeople
	},
	{
		method: 'PUT',
		path: '/PE2/addPetToPerson/{IDPerson}',
		config: person.addPetToPerson
	},
	{
		method: 'PUT',
		path: '/PE2/deletePetFromPerson/{IDPerson}',
		config: person.deletePetFromPerson
	},
	{
		method: 'GET',
		path: '/PE2/PersonByID/{IDPerson}',
		config: person.getPersonByID
	},
	{
		method: 'PUT',
		path: '/PE2/addFriend/{IDPerson}',
		config: person.addFriend
	},
	{
		method: 'PUT',
		path: '/PE2/deleteFriend/{IDPerson}',
		config: person.deleteFriend
	},

	/*Aqui terminan los endpoints de person*/

	{
		method: 'POST',
		path: '/PE2/Pet',
		config: pet.createPet
	},
	{
		method: 'PUT',
		path: '/PE2/Pet/{IDPet}',
		config: pet.editPet
	},
	{
		method: 'DELETE',
		path: '/PE2/Pet/{IDPet}',
		config: pet.deletePet
	},
	{
		method: 'GET',
		path: '/PE2/Pets',
		config: pet.getPets
	},
	{
		method: 'GET',
		path: '/PE2/PetByID/{IDPet}',
		config: pet.getPetByID
	},

	/*Aqui terminan los endpoints de pet*/

	{
		method: 'POST',
		path: '/PE2/Employee',
		config: employee.createEmployee
	},
	{
		method: 'PUT',
		path: '/PE2/Employee/{IDEmployee}',
		config: employee.editEmployee
	},
	{
		method: 'DELETE',
		path: '/PE2/Employee/{IDEmployee}',
		config: employee.deleteEmployee
	},
	{
		method: 'GET',
		path: '/PE2/Employees',
		config: employee.getEmployees
	},
	{
		method: 'GET',
		path: '/PE2/EmployeeByID/{IDEmployee}',
		config: employee.getEmployeeByID
	},

	/*Aqui terminan los endpoints de employee*/

	{
		method: 'GET',
		path: '/PE2/logout',
		config: authentication.logout
	},
	{
		method: 'POST',
		path: '/PE2/login',
		config: authentication.login
	}
]