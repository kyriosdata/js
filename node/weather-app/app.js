const getJson = require("./networking");

const host = "http://api.weatherstac.com/current?";
const getParams = (key, local) => `access_key=${key}&query=${local}&units=f`;

const WEATHER_STACK_KEY = process.env.WEATHER_STACK_KEY;
if (!WEATHER_STACK_KEY) {
  console.log("We need WEATHERSTACK key to run...");
  return;
}

const URL =
  host + getParams(WEATHER_STACK_KEY, "-16.45012977562169, -49.50002769191121");

const msg = (objeto) => console.log(`It is ${objeto.current.temperature}`);

// Aqui é feita a chamada
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
