const path = require("path");
const express = require("express");

const app = express();
app.use(express.static(path.join(__dirname, "../public")));

app.get("/weather", (req, res) => {
  res.send({
    cidade: "Goiânia",
    temperatura: 29,
  });
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
