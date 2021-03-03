const { http, https } = require("follow-redirects");

function getJson(url, callback) {
  function resposta(res) {
    const chunks = [];

    res.on("data", (chunk) => chunks.push(chunk));

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      const json = body.toString();
      const objeto = JSON.parse(json);

      if (objeto.error) {
        callback(objeto.error);
      } else {
        callback(undefined, objeto);
      }
    });
  }

  const callOnError = (error) => callback(error);
  const request = url.startsWith("https") ? https : http;
  request.get(url, resposta).on("error", callOnError).end();
}

module.exports = getJson;
