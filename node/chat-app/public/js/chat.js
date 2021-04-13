/**
 * O código abaixo pode ser melhor organizado.
 * AsyncApi.com é uma alternativa. Idealmente,
 * cada evento deve ser identificado assim como
 * o payload correspondente.
 *
 * A estratégia corrente exige que se tenha acesso
 * ao código do cliente, presente arquivo e ao
 * código do servidor. Este acesso é utilizado
 * para localizar as mensagens e verificar o que
 * é enviado/recebido, o que seguramente é
 * indesejável.
 */
const socket = io();

const formulario = document.getElementById("message-form");
const mensagemEntrada = document.getElementById("mensagem");
const botaoEnvia = document.getElementById("botao-envia");
const shareLocation = document.getElementById("share-location");
const mensagens = document.getElementById("messages");
const sidebar = document.getElementById("sidebar");

// Templates
const messageTemplate = document.getElementById("message-template").innerHTML;
const locationTemplate = document.getElementById("location-template").innerHTML;
const sidebarTemplate = document.getElementById("sidebar-template").innerHTML;

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
    const payload = { autor: username, local };

    // ------
    // EVENTO sendLocation
    // ------
    socket.emit("sendLocation", payload, () => {
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
socket.on("welcome", (welcome) => {
  exibeInfo({ ...welcome, geradoEm: new Date().getTime() });
});

// ------
// EVENTO existente
// ------
socket.on("existente", (welcome) => {
  exibeInfo({ ...welcome, geradoEm: new Date().getTime() });
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
// EVENTO locationMessage
// ------
socket.on("locationMessage", (payload) => {
  const html = Mustache.render(locationTemplate, {
    autor: payload.autor,
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
socket.emit("join", { username, room }, (resultado) => {
  if (!resultado) {
    alert("já existe usuário");
    location.href = "/index.html";
  }
});

socket.on("sala-composicao", ({ sala, usuarios }) => {
  const html = Mustache.render(sidebarTemplate, { sala, usuarios });
  sidebar.innerHTML = html;
});
