// index.js
const { sequelize } = require("./models/App");
const app = require("./app");

const port = 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(
      `Servidor e banco sincronizados. Rodando em http://localhost:${port}`
    );
  });
});
