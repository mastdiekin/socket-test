const { Sequelize } = require("sequelize");
const config = require("./config/config.json");
const { database, username, password, dialect, host } = config.development;
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  logging: false,
});
module.exports = sequelize;
