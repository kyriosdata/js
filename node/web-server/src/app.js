/**
 * Web Server (Express.js)
 */

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./geocode");
const temperatura = require("./temperatura");

const app = express();
const PORT = process.env.PORT || 3000;

// Diretórios configurados
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

// Configura Express para usar handlebars
app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);

// Search here first.
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
  if (!req.query.address) {
    return res.send({ error: "It is necessary to send address to query" });
  }

  geocode(req.query.address, (error, geo) => {
    if (error) {
      return res.send({ error: error });
    }

    temperatura(geo, (temperatureError, graus) => {
      if (temperatureError) {
        return res.send({ error: temperatureError });
      }

      res.send(graus);
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Something went wrong (404)",
    msg: "Help article not fond",
    author: "Fábio Nogueira de Lucena",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Something went wrong (404)",
    msg: "Page not found",
    author: "Fábio Nogueira de Lucena",
  });
});

app.listen(PORT, () => {
  console.log("Server is up and running on port " + PORT);
});
