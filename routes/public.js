// === routes/public.js ===
const express = require("express");
const router = express.Router();
const App = require("../models/App");

router.get("/", async (req, res) => {
  const apps = await App.findAll({ order: [["createdAt", "DESC"]] });
  res.render("index", { apps });
});

module.exports = router;
