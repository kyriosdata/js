/**
 * Web Server (Express.js)
 */

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Diretórios configurados
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

// Configura Express para usar handlebars
app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));

// Render by handlebars
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    author: "Fábio Nogueira de Lucena",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App (about)",
    author: "Fábio Nogueira de Lucena",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App (help)",
    msg: "The help text goes here.",
    author: "Fábio Nogueira de Lucena",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    cidade: "Goiânia",
    temperatura: 29,
  });
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
