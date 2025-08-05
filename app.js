const express = require("express");
const path = require("path");
const sequelize = require("./database");
const App = require("./models/App");

const adminRouter = require("./routes/admin");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use as rotas admin com prefixo /admin
app.use("/admin", adminRouter);

// Rota raiz pública
app.get("/", async (req, res) => {
  try {
    const apps = await App.findAll();
    res.render("index", { apps });
  } catch {
    res.status(500).send("Erro ao carregar apps");
  }
});

sequelize
  .sync()
  .then(() => console.log("Banco sincronizado."))
  .catch(console.error);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
