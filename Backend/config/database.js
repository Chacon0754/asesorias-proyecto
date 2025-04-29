const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "oracle://uach_as:password@localhost:1521/XEPDB1",
);

module.exports = sequelize;
