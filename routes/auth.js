const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, sequelize } = require("../models/User");
const { Op } = require("sequelize");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password)
    return res.status(400).send("Preencha todos os campos");

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: login }, { email: login }],
      },
    });
    if (!user) return res.status(400).send("Usuário ou senha inválidos");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Usuário ou senha inválidos");

    // Login bem-sucedido (aqui normalmente você cria sessão ou token)
    res.send("Login realizado com sucesso");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("Preencha todos os campos");
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    await User.create({
      username,
      email,
      password: passwordHash,
    });
    res.status(201).send("Usuário criado com sucesso");
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send("Usuário ou email já cadastrado");
    }
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
