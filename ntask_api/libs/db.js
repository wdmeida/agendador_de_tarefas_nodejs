const Sequelize = require("sequelize");
const config = require("./config.js");

var sequelize = null;

module.exports = app => {
  if (!sequelize) {
    sequelize = new Sequelize(
                config.database,
                config.username,
                config.password,
                config.params
              );
  }
  return sequelize;
};
