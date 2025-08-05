const sequelize = require("./database");

async function addBannedColumn() {
  await sequelize.query(
    "ALTER TABLE Users ADD COLUMN banned BOOLEAN NOT NULL DEFAULT 0"
  );
  console.log("Coluna 'banned' adicionada com sucesso.");
  process.exit();
}

addBannedColumn().catch((err) => {
  console.error("Erro ao adicionar coluna:", err);
  process.exit(1);
});
