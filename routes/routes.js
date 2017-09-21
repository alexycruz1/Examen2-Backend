var person = require('../controllers/personController');
var bomb = require('../controllers/bombController');
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
		method: 'GET',
		path: '/PE2/PersonByID/{IDPerson}',
		config: person.getPersonByID
	},

	/*aqui termina persona*/

	{
		method: 'POST',
		path: '/PE2/Bomb',
		config: bomb.createBomb
	},
	{
		method: 'PUT',
		path: '/PE2/Bomb/{IDBomb}',
		config: bomb.editBomb
	},
	{
		method: 'DELETE',
		path: '/PE2/Bomb/{IDBomb}',
		config: bomb.deleteBomb
	},
	{
		method: 'GET',
		path: '/PE2/Bombs',
		config: bomb.getBombs
	},
	{
		method: 'GET',
		path: '/PE2/BombByID/{IDBomb}',
		config: bomb.getBombByID
	}
]