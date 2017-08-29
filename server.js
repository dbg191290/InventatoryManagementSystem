var Hapi = require('hapi');
var models = require('./models');
var config = require('./config/server_settings');
// var routes = require('./api/routes/ProductStock');
var routes = require('./api/routes');

GLOBAL.server = new Hapi.Server();

server.connection(config);

for (var i = 0; i < routes.length; i++) {
    server.route(routes[i]);
}

server.start(function () {
    console.log('Welcome...! InventoryManagement System Server Address:', server.info.uri);
});

models.sequelize.sync({ force: false }).then(function () {
    // console.log('Express');
});

