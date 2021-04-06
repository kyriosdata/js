/**
 * Início da aplicação no ambiente de produção
 */

const server = require("./app");

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Server está em execuçao na porta " + port);
});
