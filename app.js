const express = require("express");
const path = require("path");
const sequelize = require("./database");
const App = require("./models/App");

const adminRouter = require("./routes/admin");
const publicRouter = require("./routes/public");

const app = express(); // declara o app antes de usar

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "layout"); // usa views/layout.ejs por padrão

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas públicas e admin
app.use("/", publicRouter);
app.use("/admin", adminRouter);

// Rota raiz pública (caso queira um tratamento direto)
app.get("/", async (req, res) => {
  try {
    const apps = await App.findAll();
    res.render("index", { apps });
  } catch {
    res.status(500).send("Erro ao carregar apps");
  }
});

// Sincroniza banco (force: true apaga e recria tabelas - cuidado com dados)
sequelize
  .sync({ force: false }) // tire o force: true para não apagar dados
  .then(() => console.log("Banco sincronizado."))
  .catch(console.error);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
