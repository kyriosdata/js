const socket = io();

const formulario = document.getElementById("message-form");
const mensagemEntrada = document.getElementById("mensagem");
const botaoEnvia = document.getElementById("botao-envia");
const shareLocation = document.getElementById("share-location");
const messageTemplate = document.getElementById("message-template").innerHTML;
const locationTemplate = document.getElementById("location-template").innerHTML;
const mensagens = document.getElementById("messages");

// Alterado apenas quano há informação para ser enviada
botaoEnvia.disabled = true;

shareLocation.addEventListener("click", () => {
  if (!navigator.geolocation) {
    console.log("Geolocation não está disponível no seu browser");
    return;
  }

  shareLocation.disabled = true;

  navigator.geolocation.getCurrentPosition((posicao) => {
    const { latitude, longitude } = posicao.coords;
    const local = { latitude, longitude };

    // ------
    // EVENTO sendLocation
    // ------
    socket.emit("sendLocation", local, () => {
      shareLocation.disabled = false;
    });
  });
});

function envioHandler() {
  const texto = mensagemEntrada.value;
  if (texto.trim() === "") {
    mensagemEntrada.value = "";
    return;
  }

  mensagemEntrada.setAttribute("disabled", "disabled");
  botaoEnvia.disabled = true;

  console.log("Requisitei divulgação de", texto);

  // ------
  // EVENTO divulgue
  // ------
  socket.emit("divulgue", texto, (retorno) => {
    console.log(`Enviado ${texto} recebido ${retorno}`);
  });

  mensagemEntrada.value = "";
  mensagemEntrada.removeAttribute("disabled");
  mensagemEntrada.focus();
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  envioHandler();
});

botaoEnvia.addEventListener("click", () => {
  envioHandler();
});

mensagemEntrada.addEventListener("keyup", () => {
  if (mensagemEntrada.value.trim() === "") {
    botaoEnvia.disabled = true;
    mensagemEntrada.value = "";
    return;
  }

  botaoEnvia.disabled = false;
});

// ------
// EVENTO welcome
// ------
socket.on("welcome", (msg) => {
  console.log(msg);
});

// ------
// EVENTO mensagem
// ------
socket.on("mensagem", (msg) => {
  const html = Mustache.render(messageTemplate, {
    message: msg,
  });
  messages.insertAdjacentHTML("beforeend", html);
});

// ------
// EVENTO amigo
// ------
socket.on("locationMessage", (url) => {
  const html = Mustache.render(locationTemplate, { url });
  messages.insertAdjacentHTML("beforeend", html);
});

// ------
// EVENTO send-credentials
// ------
socket.on("send-credentials", () => {
  socket.emit("credencial", "user/password", (tokenReceived) => {
    console.log("TOKEN", tokenReceived);
  });
});

// ------
// EVENTO any
// ------
socket.onAny((event, ...args) => {
  console.log(`RECEBIDO ${event} ARGS: ${args}`);
});
