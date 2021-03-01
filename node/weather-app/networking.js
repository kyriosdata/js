const { http, https } = require("follow-redirects");

function getJson(url, callback) {
  function resposta(res) {
    const chunks = [];

    res.on("data", (chunk) => chunks.push(chunk));

    res.on("end", function (chunk) {
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

const geoUrl = (local, key) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${local}&key=${key}&language=pt-br`;

const weatherUrl = (key, local) =>
  `http://api.weatherstack.com/current?access_key=${key}&query=${local}&units=m`;

function geocode(cidade, callback) {
  const localizacao = (error, geocodeAnswer) => {
    if (error) {
      callback(error);
    } else if (geocodeAnswer.results.length === 0) {
      const detalhe = geocodeAnswer.error_message;
      if (detalhe) {
        callback("Não foi possível obter localização. " + detalhe);
      } else {
        callback(`Nenhum resultado encontrado para ${cidade}`);
      }
    } else {
      const location = geocodeAnswer.results[0].geometry.location;
      callback(undefined, {
        cidade: cidade,
        latitude: location.lat,
        longitude: location.lng,
      });
    }
  };

  const encoded = encodeURIComponent(cidade);
  const geocodeUrl = geoUrl(encoded, process.env.GOOGLE_API_KEY);
  getJson(geocodeUrl, localizacao);
}

function weather(local, callback) {
  const temperaturaPara = (error, weatherAnswer) => {
    if (error) {
      callback("Não foi possível obter temperatura. " + error.info);
    } else {
      const temperatura = weatherAnswer.current.temperature;
      callback(undefined, { cidade: local.cidade, temperatura: temperatura });
    }
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
