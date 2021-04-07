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

// Trata cada conexão. A cada nova tentativa de conexão
// este event handler será chamado. O cliente receberá
// como resposta o evento 'countUpdated'.
// servidor <- connection
io.on("connection", (socket) => {
  console.log("Mais um evento 'connection'...");

  socket.emit("send-credentials");

  // Usa a conexão (socket) para enviar evento
  // especificamente para o cliente que está se conectando.
  socket.emit("welcome", "Bem-vindo ao nosso servidor!");

  // Envia evento para todos os clientes, exceto o que
  // está se conectando no momento.
  socket.broadcast.emit("mensagem", "Um novo usuário juntou-se a nós!");

  socket.on("mensagem", (msg) => {
    io.emit("mensagem", msg);
  });

  // Trata 'sendLocation' gerado por cliente.
  // Quando concluído, gera acknowledge.
  socket.on("sendLocation", (posicao, callback) => {
    const local = `${posicao.latitude},${posicao.longitude}`;
    const url = `https://google.com/maps?q${local}`;
    io.emit("amigo", url);
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("mensagem", "Um usuário se desconectou...");
  });

  socket.on("credencial", (credencial, callback) => {
    const verificada = credencial.toUpperCase();
    callback(verificada);
  });
});

module.exports = server;
