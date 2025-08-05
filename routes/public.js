const express = require("express");
const router = express.Router();
const { App } = require("../models/App");

router.get("/", async (req, res) => {
  try {
    const apps = await App.findAll();
    res.render("public-index", { apps });
  } catch (error) {
    res.status(500).send("Erro ao carregar página inicial");
  }
});

router.get("/category.html", async (req, res) => {
  const categoryQuery = req.query.category;
  if (!categoryQuery) return res.redirect("/");

  try {
    const apps = await App.findAll({
      where: {
        category: categoryQuery,
      },
    });

    res.render("category", {
      apps,
      category: categoryQuery,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar página de categoria");
  }
});

module.exports = router;
