const http = require("follow-redirects").http;

const host = "http://api.weatherstack.com/current?";
const getParams = (key, local) => `access_key=${key}&query=${local}`;

const WEATHER_STACK_KEY = process.env.WEATHER_STACK_KEY;
if (!WEATHER_STACK_KEY) {
  console.log("We need WEATHERSTACK key to run...");
  return;
}

const URL =
  host + getParams(WEATHER_STACK_KEY, "-16.45012977562169, -49.50002769191121");

function getJson(url, callback) {
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
        callback(objeto);
      }
    });
  }

  http.get(url, internaResposta).end();
}

getJson(URL, (objeto) => console.log(`It is ${objeto.current.temperature}`));
