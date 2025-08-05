// === models/App.js ===
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const App = sequelize.define("App", {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  imagem: DataTypes.STRING,
});

module.exports = App;
