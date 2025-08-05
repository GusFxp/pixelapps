// routes/api.js
const express = require("express");
const router = express.Router();
const { App } = require("../models/App");

router.get("/apps", async (req, res) => {
  try {
    const apps = await App.findAll();
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar apps" });
  }
});

module.exports = router;
