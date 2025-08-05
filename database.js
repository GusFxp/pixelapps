// database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // único arquivo .sqlite para todo o app
  logging: false,
});

module.exports = sequelize;
