// Objeto do lado do client que está ligado com servidor
const socket = io();

// Sinaliza evento para o servidor
// cliente -> increment
document.getElementById("message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = document.getElementById("mensagem").value;
  socket.emit("mensagem", texto);
});

document.getElementById("mensagem").addEventListener("keyup", () => {
  const elemento = document.getElementById("mensagem");
  socket.emit("mensagem", elemento.value);
});

// cliente <- welcome
socket.on("welcome", (msg) => {
  console.log(msg);
});

socket.on("mensagem", (msg) => {
  console.log(msg);
});
