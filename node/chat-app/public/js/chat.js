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

// LOGIN define 'username' e 'room'
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

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
  socket.emit("divulgue", { texto, room, username }, (retorno) => {
    console.log(`Enviado ${texto} recebido ${retorno}`);
  });

  mensagemEntrada.value = "";
  mensagemEntrada.removeAttribute("disabled");
  mensagemEntrada.focus();
}

const autoscroll = () => {
  // altura da área que é visível
  const visibleHeight = mensagens.offsetHeight;

  // toda a altura do contêiner de mensagens (scroll)
  const conteinerHeight = mensagens.scrollHeight;

  mensagens.scrollTop = conteinerHeight - visibleHeight;
};

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
  exibeInfo({ msg, geradoEm: new Date().getTime() });
  autoscroll();
});

const formataInstante = (time) => moment(time).format("kk:mm");

const exibeInfo = (info) => {
  const contexto = {
    autor: info.autor ? info.autor : "não identificado",
    msg: info.msg,
    geradoEm: formataInstante(info.geradoEm),
  };

  const html = Mustache.render(messageTemplate, contexto);
  messages.insertAdjacentHTML("beforeend", html);
};

// ------
// EVENTO mensagem
// ------
socket.on("mensagem", (payload) => {
  exibeInfo(payload);
  autoscroll();
});

// ------
// EVENTO amigo
// ------
socket.on("locationMessage", (payload) => {
  const html = Mustache.render(locationTemplate, {
    url: payload.msg,
    geradoEm: formataInstante(payload.geradoEm),
  });
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

// ------
// EVENTO join
// ------
socket.emit("join", { username, room });
