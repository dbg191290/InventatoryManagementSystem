"use strict";

var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var config = require('../config').storage['main'];
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';

var db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;