var hapi = require('hapi');
var inert = require('inert');
var mongoose = require('mongoose');
var routes = require('./routes/routes.js');
var auth = require('hapi-auth-cookie');
var readline = require('readline');

var server = new hapi.Server();
server.connection({
    port: process.env.PORT || 8000,
    routes: {cors: true}
});

//mongoose.connect('mongodb://127.0.0.1:27017/PE2');
mongoose.connect('mongodb://admin:admin@ds141534.mlab.com:41534/pets-home');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

server.register([inert, auth], function(err){

 server.auth.strategy('session', 'cookie', {
    password: 'minimum-32-characters-password1234567890', /*'secretpasswordforencryption',*/
    cookie: 'angular-scaffold-cookie',
    ttl: 24 * 60 * 60 * 1000, // Set session to 1 day
    isSecure: false
  });


  server.route(routes.endpoints);

  server.start(function () {
      console.log('Server running at:', server.info.uri);     
  });
});


