// === routes/admin.js ===
const express = require("express");
const router = express.Router();
const App = require("../models/App");

router.get("/", async (req, res) => {
  const apps = await App.findAll();
  res.render("admin/dashboard", { apps });
});

router.post("/add", async (req, res) => {
  const { name, description, imagem } = req.body;
  await App.create({ name, description, imagem });
  res.redirect("/admin");
});

module.exports = router;
