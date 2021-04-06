/**
 * Base da aplicação
 * (útil para produção e também desenvolvimento)
 */
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const healthRouter = require("./routers/health");

const app = express();

// JSON recebido é convertido em objeto.
app.use(express.json());

// Usa diretório "public" para disponibilizar static files
// ../x.png (o nome do diretório não faz parte da URL)
app.use(express.static(path.join(__dirname, "../public")));

app.use(healthRouter);

// Exibe ambiente
if (process.env.ENVIRONMENT && process.env.ENVIRONMENT === "dev") {
  console.log("Ambiente de Desenvolvimento");
}

// Preparação para WebSockets
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", () => {
  console.log("connection...");
});

module.exports = server;
