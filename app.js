// app.js
const express = require("express");
const path = require("path");
const sequelize = require("./database");

const { User } = require("./models/User");
const { App } = require("./models/App");

const adminRoutes = require("./routes/admin");
const publicRoutes = require("./routes/public");
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);
app.use("/", publicRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
