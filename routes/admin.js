// routes/admin.js

const express = require("express");
const router = express.Router();
const { App } = require("../models/App");
const { User } = require("../models/User");

// Painel admin principal (com menu simples)
router.get("/", (req, res) => {
  res.render("admin-panel");
});

// Cria novo app
router.get("/apps/create", (req, res) => {
  res.render("admin-app-create");
});

router.post("/apps/create", async (req, res) => {
  try {
    await App.create(req.body);
    res.redirect("/admin/apps");
  } catch (err) {
    res.status(400).send("Erro ao criar app: " + err.message);
  }
});

// Lista todos os apps
router.get("/apps", async (req, res) => {
  try {
    const apps = await App.findAll();
    res.render("admin-apps", { apps });
  } catch (err) {
    res.status(500).send("Erro ao buscar apps: " + err.message);
  }
});

// Rota para editar app - formulário carregando dados atuais
router.get("/apps/edit/:id", async (req, res) => {
  try {
    const app = await App.findByPk(req.params.id);
    if (!app) return res.status(404).send("App não encontrado");
    res.render("admin-app-edit", { app });
  } catch (err) {
    res.status(500).send("Erro ao buscar app: " + err.message);
  }
});

// Rota para salvar edição do app
router.post("/apps/edit/:id", async (req, res) => {
  try {
    const app = await App.findByPk(req.params.id);
    if (!app) return res.status(404).send("App não encontrado");
    await app.update(req.body);
    res.redirect("/admin/apps");
  } catch (err) {
    res.status(400).send("Erro ao atualizar app: " + err.message);
  }
});

// Rota para excluir app
router.post("/apps/delete/:id", async (req, res) => {
  try {
    const app = await App.findByPk(req.params.id);
    if (!app) return res.status(404).send("App não encontrado");
    await app.destroy();
    res.redirect("/admin/apps");
  } catch (err) {
    res.status(400).send("Erro ao deletar app: " + err.message);
  }
});

// Rota para listar usuários no admin
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "banned"],
    });
    res.render("admin-users", { users });
  } catch (err) {
    res.status(500).send("Erro ao buscar usuários: " + err.message);
  }
});

// Rota para banir ou desbanir usuário
router.post("/users/ban/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("Usuário não encontrado");
    user.banned = !user.banned;
    await user.save();
    res.redirect("/admin/users");
  } catch (err) {
    res.status(500).send("Erro ao atualizar usuário: " + err.message);
  }
});

// Rota para apagar usuário
router.post("/users/delete/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("Usuário não encontrado");
    await user.destroy();
    res.redirect("/admin/users");
  } catch (err) {
    res.status(500).send("Erro ao apagar usuário: " + err.message);
  }
});

module.exports = router;
