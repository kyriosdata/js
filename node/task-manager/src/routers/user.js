const express = require("express");
const User = require("../models/user");

const router = new express.Router();

// Acrescentar usuário
router.post("/user", async (req, res) => {
  try {
    const created = await new User(req.body).save();
    const total = await User.countDocuments({});
    res.send({ saved: created._id, total });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/user", (req, res) => {
  User.find({}, (e, r) => {
    if (e) {
      res.send({ erro: e });
    } else {
      res.setHeader("total", r.length);
      res.send(r);
    }
  });
});

router.get("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((u) => {
      if (!u) {
        res.status(404).send({ msg: "Nenhum usuário com o id fornecido" });
      } else {
        res.send(u);
      }
    })
    .catch((e) => res.status(500).send(e));
});

// Contar total de usuários
router.get("/user/count", (req, res) => {
  User.countDocuments({}, (e, c) => {
    if (e) {
      res.send({ erro: e });
    } else {
      res.send({ type: "User", total: c });
    }
  });
});

module.exports = router;
