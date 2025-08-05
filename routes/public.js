const express = require("express");
const router = express.Router();
const { App } = require("../models/App");

router.get("/", async (req, res) => {
  try {
    const apps = await App.findAll();
    res.render("public-index", { apps });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar página inicial");
  }
});

module.exports = router;
