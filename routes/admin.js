const express = require("express");
const router = express.Router();
const App = require("../models/App");

// Dashboard admin
router.get("/", async (req, res) => {
  try {
    const total = await App.count();
    res.render("admin/dashboard", { total, title: "Dashboard Admin" });
  } catch (error) {
    res.status(500).send("Erro ao carregar dashboard");
  }
});

// Listar apps
router.get("/apps", async (req, res) => {
  try {
    const apps = await App.findAll();
    res.render("admin/apps", { apps, title: "Apps cadastrados" });
  } catch (error) {
    res.status(500).send("Erro ao carregar apps");
  }
});

// Formulário para novo app
router.get("/apps/new", (req, res) => {
  res.render("admin/new-app", { title: "Novo App" });
});

// Criar novo app
router.post("/apps", async (req, res) => {
  try {
    const { nome, descricao, categoria, plataforma, versao, link, imagem } =
      req.body;
    await App.create({
      nome,
      descricao,
      categoria,
      plataforma,
      versao,
      link,
      imagem,
    });
    res.redirect("/admin/apps");
  } catch (error) {
    res.status(500).send("Erro ao criar app");
  }
});

// Formulário de edição
router.get("/apps/:id/edit", async (req, res) => {
  try {
    const appToEdit = await App.findByPk(req.params.id);
    if (!appToEdit) return res.status(404).send("App não encontrado");
    res.render("admin/edit-app", { app: appToEdit, title: "Editar App" });
  } catch (error) {
    res.status(500).send("Erro ao carregar app");
  }
});

// Atualizar app
router.post("/apps/:id", async (req, res) => {
  try {
    const { nome, descricao, categoria, plataforma, versao, link, imagem } =
      req.body;
    const appToUpdate = await App.findByPk(req.params.id);
    if (!appToUpdate) return res.status(404).send("App não encontrado");
    await appToUpdate.update({
      nome,
      descricao,
      categoria,
      plataforma,
      versao,
      link,
      imagem,
    });
    res.redirect("/admin/apps");
  } catch (error) {
    res.status(500).send("Erro ao atualizar app");
  }
});

// Deletar app
router.post("/apps/:id/delete", async (req, res) => {
  try {
    const appToDelete = await App.findByPk(req.params.id);
    if (!appToDelete) return res.status(404).send("App não encontrado");
    await appToDelete.destroy();
    res.redirect("/admin/apps");
  } catch (error) {
    res.status(500).send("Erro ao deletar app");
  }
});

module.exports = router;
