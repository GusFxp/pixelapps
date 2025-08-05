// models/App.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const App = sequelize.define("App", {
  name: { type: DataTypes.STRING, allowNull: false },
  version: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  platform: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  downloadUrl: { type: DataTypes.STRING },
  imagem: { type: DataTypes.STRING },
});

module.exports = { App };
