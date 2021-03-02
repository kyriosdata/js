const path = require("path");
const express = require("express");

const app = express();

// Configura Express para usar handlebars
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));

// Render by handlebars
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    author: "Fábio Nogueira de Lucena",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    author: "Fábio Nogueira de Lucena",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
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
