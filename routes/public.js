const express = require("express");
const router = express.Router();
const App = require("../models/App");

// Página pública
router.get("/", async (req, res) => {
  try {
    const apps = await App.findAll({ order: [["createdAt", "DESC"]] });
    res.render("index", { apps, title: "PixelApps - Loja de Apps" });
  } catch (error) {
    res.status(500).send("Erro ao carregar a página");
  }
});

module.exports = router;
