const express = require("express");
const User = require("../models/user");

const router = new express.Router();

// Acrescentar usuário
router.post("/users", async (req, res) => {
  try {
    const created = await new User(req.body).save();
    const total = await User.countDocuments({});
    res.send({ saved: created._id, total });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/:id", async (req, res) => {
  const nova = req.body.description;
  try {
    const alterada = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: false,
      useFindAndModify: false,
      runValidators: true,
    });

    if (!alterada) {
      res.stats(404).send();
    } else {
      res.send({ alterada, nova });
    }
  } catch (e) {
    res.status(400).send({ erro: e });
  }
});

router.get("/users", async (req, res) => {
  try {
    const usuarios = await User.find({});
    if (usuarios) {
      res.setHeader("total", usuarios.length);
      res.send(usuarios);
    } else {
      res.send({ erro: usuarios });
    }
  } catch (e) {
    res.status(400).send({ erro: e });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ msg: "Nenhum usuário com o id fornecido" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// Contar total de usuários
router.get("/total/users", async (req, res) => {
  try {
    const total = await User.countDocuments({});
    res.send({ type: "User", total });
  } catch (erro) {
    res.send({ erro });
  }
});

router.delete("/todas/users", async (req, res) => {
  try {
    const removidos = await User.deleteMany({});
    if (removidos) {
      res.send({ removidos });
    } else {
      res.status(400).send({ erro: "nenhum removido" });
    }
  } catch (erro) {
    res.status(400).send({ erro });
  }
});

module.exports = router;
