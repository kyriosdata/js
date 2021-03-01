const { http, https } = require("follow-redirects");

function getJson(url, callback, error) {
  function internaResposta(res) {
    const chunks = [];

    res.on("data", (chunk) => chunks.push(chunk));

    res.on("end", function (chunk) {
      const body = Buffer.concat(chunks);
      const json = body.toString();
      const objeto = JSON.parse(json);

      if (objeto.error) {
        console.log("houve um erro...");
      } else {
        // TODO tratar high level error (depende do serviço)
        callback(objeto);
      }
    });
  }

  // Use tratamento de erro de baixo nível, se fornecido
  const erro = error ? error : () => console.log("ERRO " + url);

  const protocolo = url.startsWith("https") ? https : http;
  protocolo.get(url, internaResposta).on("error", erro).end();
}

module.exports = getJson;
