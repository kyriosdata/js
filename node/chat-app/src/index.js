/**
 * Início da aplicação no ambiente de produção
 */

const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server está em execuçao na porta " + port);
});
