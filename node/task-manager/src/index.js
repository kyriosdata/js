const express = require("express");
require("./db/mongoose");

const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

// JSON recebido é convertido em objeto.
app.use(express.json());

// Apenas para verificar funcionamento (health)
app.get("", (req, res) => {
  res.send("ok");
});

// Acrescentar usuário
app.post("/user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((x) => res.send({ saved: x._id }))
    .catch((e) => res.send({ erro: e }));
});

app.get("/user", (req, res) => {
  User.find({}, (e, r) => {
    if (e) {
      res.send({ erro: e });
    } else {
      res.setHeader("total", r.length);
      res.send(r);
    }
  });
});

// Contar total de usuários
app.get("/user/count", (req, res) => {
  User.countDocuments({}, (e, c) => {
    if (e) {
      res.send({ erro: e });
    } else {
      res.send({ type: "User", total: c });
    }
  });
});

app.listen(port, () => {
  console.log("Server está em execuçao na porta " + port);
});
