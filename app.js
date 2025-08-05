const express = require("express");
const path = require("path");
const sequelize = require("./database");
const App = require("./models/App");

const session = require("express-session");
const flash = require("connect-flash");

const adminRouter = require("./routes/admin");
const publicRouter = require("./routes/public");
const authRouter = require("./routes/auth"); // vai precisar criar essa rota depois
const adminUsersRouter = require("./routes/admin-users");

const app = express();
const expressLayouts = require("express-ejs-layouts");

// Configuração da view engine e layouts
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração de sessão
app.use(
  session({
    secret: "sua-chave-secreta", // troque por uma string segura
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 dia
  })
);

// Configuração do flash para mensagens temporárias
app.use(flash());

// Middleware para tornar flash messages e usuário acessíveis nas views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.user = req.session.user || null;
  next();
});

// Middleware para escolher layout (público ou admin)
app.use((req, res, next) => {
  if (req.path.startsWith("/admin")) {
    res.locals.layout = "layout-admin";
  } else {
    res.locals.layout = "layout";
  }
  next();
});

// Rotas
app.use("/", publicRouter);
app.use("/auth", authRouter); // Rotas de login/registro/logout
app.use("/admin", adminRouter);
app.use("/admin/users", adminUsersRouter);

// Sincronizar banco
sequelize
  .sync({ force: false })
  .then(() => console.log("Banco sincronizado."))
  .catch(console.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
