// routes/apps.js
const express = require("express");
const router = express.Router();
const { App } = require("../models/App");

// Rota para listar todos apps
router.get("/", async (req, res) => {
  const apps = await App.findAll();
  res.json(apps);
});

// Rota para criar novo app
router.post("/", async (req, res) => {
  try {
    const app = await App.create(req.body);
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
