const { geocode, weather } = require("./networking");

const callback = (r) => console.log(r.cidade, r.temperatura);
geocode("Brasília", (local) => weather(local, callback));
