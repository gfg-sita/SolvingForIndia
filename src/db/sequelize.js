const { Sequelize } = require('sequelize');
const config = require('../config');

const cockroach = new Sequelize(
  config.cockroach.database,
  config.cockroach.username,
  config.cockroach.password,
  {
    host: config.cockroach.host,
    dialect: config.cockroach.dialect,
    port: config.cockroach.port,
    dialectOptions: config.cockroach.dialectOptions,
  }
);

const cloudSQL = new Sequelize(
  config.cloudSQL.database,
  config.cloudSQL.username,
  config.cloudSQL.password,
  {
    host: config.cloudSQL.host,
    dialect: config.cloudSQL.dialect,
    port: config.cloudSQL.port,
    dialectOptions: config.cloudSQL.dialectOptions,
  }
);

module.exports = {
  cockroach,
  cloudSQL,
};