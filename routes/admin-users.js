const express = require("express");
const router = express.Router();
const { adminOnly } = require("../middleware/adminOnly");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Protege todas as rotas
router.use(adminOnly);

// Listar administradores
router.get("/", async (req, res) => {
  const admins = await User.findAll({ where: { isAdmin: true } });
  res.render("admin/admin-users", { title: "Administradores", admins });
});

// Formulário para novo admin
router.get("/new", (req, res) => {
  res.render("admin/new-admin", { title: "Novo Administrador" });
});

// Criar novo admin
router.post("/new", async (req, res) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || !password) {
    errors.push("Preencha todos os campos");
    return res.render("admin/new-admin", {
      title: "Novo Administrador",
      errors,
    });
  }

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      errors.push("Usuário já existe");
      return res.render("admin/new-admin", {
        title: "Novo Administrador",
        errors,
      });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, passwordHash: hash, isAdmin: true });

    req.flash("success_msg", "Administrador criado com sucesso");
    res.redirect("/admin/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

// Remover admin
router.post("/delete/:id", async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id, isAdmin: true } });
    req.flash("success_msg", "Administrador removido");
    res.redirect("/admin/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao remover administrador");
  }
});

module.exports = router;
