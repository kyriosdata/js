const getJson = require("./networking");

const geoUrl = (local, key) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${local}&key=${key}&language=pt-br`;

const weatherUrl = (key, local) =>
  `http://api.weatherstack.com/current?access_key=${key}&query=${local}&units=f`;

function grausPara(cidade) {
  const getTemperatura = (geocodeGoogleAnswer) => {
    const msg = (weatherAnswer) => {
      const temperatura = weatherAnswer.current.temperature;
      console.log(`A temperatura em '${cidade}' é ${temperatura}`);
    };

    const location = geocodeGoogleAnswer.results[0].geometry.location;
    const posicao = `${location.lat},${location.lng}`;

    const wurl = weatherUrl(process.env.WEATHER_STACK_KEY, posicao);
    getJson(wurl, msg);
  };

  return getTemperatura;
}

function exibeClima(cidade) {
  const encoded = encodeURIComponent(cidade);
  const geocodeUrl = geoUrl(encoded, process.env.GOOGLE_API_KEY);
  getJson(geocodeUrl, grausPara(cidade));
}

exibeClima("Brasília");
