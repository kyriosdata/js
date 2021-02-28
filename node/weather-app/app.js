const http = require("follow-redirects").http;

const host = "http://api.weatherstack.com/current?";
const getParams = (key, local) => `access_key=${key}&query=${local}`;

const WEATHER_STACK_KEY = process.env.WEATHER_STACK_KEY;
if (!WEATHER_STACK_KEY) {
  console.log("We need WEATHERSTACK key to run...");
  return;
}

const url = host + getParams(WEATHER_STACK_KEY, "-16,-49");

function getTemperatura(callback) {
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
        callback(
          `It is ${objeto.current.temperature}, but seems ${objeto.current.feelslike}`
        );
      }
    });
  }

  http.get(url, internaResposta).end();
}

getTemperatura(console.log);
