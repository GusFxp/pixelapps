const express = require("express");
const path = require("path");
const sequelize = require("./database");
const App = require("./models/App");

const adminRouter = require("./routes/admin");
const publicRouter = require("./routes/public");

const app = express();
const expressLayouts = require("express-ejs-layouts");

// Configura view engine e layouts
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para escolher layout público ou admin
app.use((req, res, next) => {
  if (req.path.startsWith("/admin")) {
    res.locals.layout = "layout-admin"; // layout admin
  } else {
    res.locals.layout = "layout"; // layout público
  }
  next();
});

// Rotas
app.use("/", publicRouter);
app.use("/admin", adminRouter);

// Sincronizar banco
sequelize
  .sync({ force: false })
  .then(() => console.log("Banco sincronizado."))
  .catch(console.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
