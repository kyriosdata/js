const { http, https } = require("follow-redirects");

const host = "http://api.weatherstac.com/current?";
const getParams = (key, local) => `access_key=${key}&query=${local}&units=f`;

const WEATHER_STACK_KEY = process.env.WEATHER_STACK_KEY;
if (!WEATHER_STACK_KEY) {
  console.log("We need WEATHERSTACK key to run...");
  return;
}

const URL =
  host + getParams(WEATHER_STACK_KEY, "-16.45012977562169, -49.50002769191121");

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

const msg = (objeto) => console.log(`It is ${objeto.current.temperature}`);
getJson(URL, msg);

const geoUrl = (local, key) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${local}&key=${key}&language=pt-br`;

const latLong = (googleAnswer) => {
  const location = googleAnswer.results[0].geometry.location;
  return `${location.lat},${location.lng}`;
};

const exibeLocation = (geo) => console.log(latLong(geo));

const geocode = geoUrl("caturai", process.env.GOOGLE_API_KEY);
getJson(geocode, exibeLocation, () => console.log("deu erro"));
