const geocode = require("./geocode");
const temperatura = require("./temperatura");

function temperaturaCallback(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(`No momento são ${data.temperatura} graus em ${data.cidade}`);
  }
}

function geocodeCallback(error, local) {
  if (error) {
    console.log(error);
  } else {
    temperatura(local, temperaturaCallback);
  }
}

if (process.argv.length < 3) {
  console.log("Forneca o nome da cidade cuja temperatura é desejada.");
  return;
}

geocode(process.argv[2], geocodeCallback);
console.log("Espere um pouco, recuperando temperatura...");
