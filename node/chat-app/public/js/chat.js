// Objeto do lado do client que está ligado com servidor
const socket = io();

// Envia compartilhamento de posição geográfica
document.getElementById("send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation não está disponível no seu browser");
  }

  navigator.geolocation.getCurrentPosition((posicao) => {
    const { latitude, longitude } = posicao.coords;
    const local = { latitude, longitude };

    // Envia evento 'sendLocation' e exibe msg quando acknowledge
    socket.emit("sendLocation", local, () => {
      console.log("O evento foi recebido pelo servidor.");
    });
  });
});

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

socket.on("amigo", (posicao) => {
  console.log("amigo", posicao);
});
