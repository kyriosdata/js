// Representa a conexão com o servidor
const socket = io();

const formulario = document.getElementById("message-form");
const mensagemEntrada = document.getElementById("mensagem");
const botaoEnvia = document.getElementById("botao-envia");
const botao = document.getElementById("send-location");

// Envia compartilhamento de posição geográfica
botao.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation não está disponível no seu browser");
  }

  botao.disabled = true;

  navigator.geolocation.getCurrentPosition((posicao) => {
    const { latitude, longitude } = posicao.coords;
    const local = { latitude, longitude };

    // Envia evento 'sendLocation' e exibe msg quando acknowledge
    socket.emit("sendLocation", local, () => {
      console.log("Localização compartilhada");
      botao.disabled = false;
    });
  });
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  mensagemEntrada.setAttribute("disabled", "disabled");
  botaoEnvia.disabled = true;

  const texto = mensagemEntrada.value;
  socket.emit("mensagem", texto);

  mensagemEntrada.value = "";
  mensagemEntrada.removeAttribute("disabled");
  botaoEnvia.disabled = false;
  mensagemEntrada.focus();
});

mensagemEntrada.addEventListener("keyup", () => {
  socket.emit("mensagem", mensagemEntrada.value);
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

socket.on("send-credentials", () => {
  console.log("received send-credentials");
  socket.emit("credencial", "user/password", (tokenReceived) => {
    console.log("TOKEN", tokenReceived);
  });
});
