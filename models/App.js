const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // assume que database.js exporta a conexão Sequelize

const App = sequelize.define("App", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING, // URL ou caminho da imagem
    allowNull: true,
  },
});

module.exports = App;
