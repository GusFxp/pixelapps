// scripts/init-db.js
const { App, sequelize } = require("../models/App");

async function init() {
  try {
    await sequelize.sync({ force: true }); // recria tabelas
    await App.bulkCreate([
      {
        name: "Pixel Editor",
        version: "1.0.0",
        platform: "Windows",
        description: "Editor de imagens pixel art simples e leve.",
        downloadUrl: "https://exemplo.com/download/pixeleditor",
      },
      {
        name: "Neon Music",
        version: "2.3.1",
        platform: "Android",
        description: "Player musical com visual cyberpunk neon.",
        downloadUrl: "https://exemplo.com/download/neonmusic",
      },
    ]);
    console.log("Banco inicializado com apps de teste.");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao inicializar banco:", error);
    process.exit(1);
  }
}

init();
