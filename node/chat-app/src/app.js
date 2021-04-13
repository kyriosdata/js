/**
 * Base da aplicação
 * (útil para produção e também desenvolvimento)
 */
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const healthRouter = require("./routers/health");
const payload = require("./messages");
const Usuarios = require("../src/users");

const app = express();

// JSON recebido é convertido em objeto.
app.use(express.json());

// Usa diretório "public" para disponibilizar static files
// ../x.png (o nome do diretório não faz parte da URL)
app.use(express.static(path.join(__dirname, "../public")));

app.use(healthRouter);

// Exibe indicação de ambiente de desenvolvimento, se for o caso.
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
  socket.emit("send-credentials");

  socket.on("divulgue", (msg) => {
    io.to(msg.room).emit("mensagem", payload(msg.texto, msg.username));
  });

  // Trata 'sendLocation' gerado por cliente.
  // Quando concluído, gera acknowledge.
  socket.on("sendLocation", (enviado, callback) => {
    const posicao = enviado.local;
    const local = `${posicao.latitude},${posicao.longitude}`;
    const url = `https://google.com/maps?q=${local}`;
    io.emit("locationMessage", payload(url, enviado.autor));
    callback();
  });

  socket.on("disconnect", () => {
    const usuario = Usuarios.remove(socket.id);
    if (!usuario) {
      return;
    }

    io.to(usuario.room).emit(
      "mensagem",
      payload(`O usuário '${usuario.username}' se desconectou...`)
    );

    io.to(usuario.room).emit("sala-composicao", {
      sala: usuario.room,
      usuarios: Usuarios.presentes(usuario.room),
    });
  });

  socket.on("credencial", (credencial, callback) => {
    const verificada = credencial.toUpperCase();
    callback(verificada);
  });

  socket.on("join", ({ username, room }, callback) => {
    const candidato = { username, room, id: socket.id };
    const usuario = Usuarios.adiciona(candidato);
    if (usuario.erro) {
      callback(false);
      return;
    }

    socket.join(room);

    // Usa a conexão (socket) para enviar evento
    // especificamente para o cliente que se conecta à sala
    socket.emit("welcome", {
      autor: "Admin",
      msg: `Bem-vindo '${username}' à sala '${room}'!`,
    });

    // Envia evento para todos os clientes, exceto o que
    // está se conectando no momento.
    socket.broadcast
      .to(room)
      .emit("mensagem", payload(`${username} juntou-se a nós...`));

    io.to(room).emit("sala-composicao", {
      sala: room,
      usuarios: Usuarios.presentes(room),
    });
  });
});

module.exports = server;
