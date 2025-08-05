// === app.js ===
const express = require("express");
const path = require("path");
const sequelize = require("./database");
const publicRoutes = require("./routes/public");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", publicRoutes);
app.use("/admin", adminRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
