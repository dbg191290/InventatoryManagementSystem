'use strict';

const config = {
  development: {
    storage: {
      main: {
        username: 'postgres',
        password: 'password@1',
        database: 'InventoryManagementSystem',
        host: 'localhost',
        dialect: 'postgres',
        timezone: '+05:30',
        collate: 'utf8_general_ci',
        port: 5432
      }
    }
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];