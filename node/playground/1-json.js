const fs = require("fs");

const bufferData = fs.readFileSync("1-json.json");
const jsonData = bufferData.toString();
const data = JSON.parse(jsonData);

data.name = "Fábio";
data.age = 53;

const jsonChanged = JSON.stringify(data);
fs.writeFileSync("1-json.json", jsonChanged);
