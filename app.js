const express = require("express");
const sequelize = require("./database");
const App = require("./models/App");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sincroniza o banco e cria as tabelas, se não existirem
sequelize
  .sync()
  .then(() => {
    console.log("Banco sincronizado.");
  })
  .catch(console.error);

// Sua aplicação aqui...

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
