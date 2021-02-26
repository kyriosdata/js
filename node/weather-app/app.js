const http = require("follow-redirects").http;

const host = "http://api.weatherstack.com/current?";
const getParams = (key, local) => `access_key=${key}&query=${local}`;
const url = host + getParams("a6b608ea77ab5a41c318022931d84b9d", "-16,-49");

function resposta(res) {
  const chunks = [];

  res.on("data", (chunk) => chunks.push(chunk));

  res.on("end", function (chunk) {
    const body = Buffer.concat(chunks);
    const json = body.toString();
    const objeto = JSON.parse(json);

    if (objeto.error) {
      console.log("houve um erro...");
    } else {
      console.log("Temperatura:", objeto.current.temperature);
    }
  });
}

const request = http.get(url, resposta);
request.end();
