// Objeto do lado do client que está ligado com servidor
const socket = io();

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

// Sinaliza evento para o servidor
// cliente -> increment
const formulario = document.getElementById("message-form");
const mensagemEntrada = document.getElementById("mensagem");
const botaoEnvia = document.getElementById("botao-envia");

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
