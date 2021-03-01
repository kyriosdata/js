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

const geoUrl = (local, key) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${local}&key=${key}&language=pt-br`;

const weatherUrl = (key, local) =>
  `http://api.weatherstack.com/current?access_key=${key}&query=${local}&units=f`;

function geocode(cidade, callback) {
  const localizacao = (geocodeGoogleAnswer) => {
    const location = geocodeGoogleAnswer.results[0].geometry.location;
    callback({
      cidade: cidade,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const encoded = encodeURIComponent(cidade);
  const geocodeUrl = geoUrl(encoded, process.env.GOOGLE_API_KEY);
  getJson(geocodeUrl, localizacao);
}

function weather(local, callback) {
  const temperaturaPara = (weatherAnswer) => {
    const temperatura = weatherAnswer.current.temperature;
    callback({ cidade: local.cidade, temperatura: temperatura });
  };

  const posicao = `${local.latitude},${local.longitude}`;
  const wurl = weatherUrl(process.env.WEATHER_STACK_KEY, posicao);
  getJson(wurl, temperaturaPara);
}

module.exports = {
  getJson: getJson,
  geocode: geocode,
  weather: weather,
};
