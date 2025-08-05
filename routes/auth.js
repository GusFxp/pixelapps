const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Página de registro
router.get("/register", (req, res) => {
  res.render("auth/register", { title: "Registrar" });
});

// Recebe dados do registro
router.post("/register", async (req, res) => {
  const { username, password, password2 } = req.body;
  const errors = [];

  if (!username || !password || !password2)
    errors.push("Preencha todos os campos");
  if (password !== password2) errors.push("Senhas não coincidem");
  if (password.length < 6) errors.push("Senha deve ter no mínimo 6 caracteres");

  if (errors.length > 0) {
    return res.render("auth/register", {
      errors,
      username,
      title: "Registrar",
    });
  }

  try {
    let user = await User.findOne({ where: { username } });
    if (user) {
      errors.push("Usuário já existe");
      return res.render("auth/register", {
        errors,
        username,
        title: "Registrar",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.create({ username, passwordHash });

    req.flash("success_msg", "Registrado com sucesso! Faça login.");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

// Página de login
router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login" });
});

// Recebe dados do login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || !password) {
    errors.push("Preencha todos os campos");
    return res.render("auth/login", { errors, username, title: "Login" });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      errors.push("Usuário ou senha incorretos");
      return res.render("auth/login", { errors, username, title: "Login" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      errors.push("Usuário ou senha incorretos");
      return res.render("auth/login", { errors, username, title: "Login" });
    }

    // Login bem-sucedido
    req.session.user = { id: user.id, username: user.username };
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
