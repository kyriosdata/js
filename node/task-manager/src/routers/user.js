const express = require("express");
const User = require("../models/user");

const router = new express.Router();

// Login
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "forneca email e password" });
    }

    const user = await User.checkCredentials(email, password);
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
});

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

// Atualiza usuário (evita getByIdAndUpdate para não pular middleware)
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["email", "password"];
  const isValidOperation = updates.every((update) => allowed.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.stats(404).send();
    }

    updates.forEach((change) => (user[change] = req.body[change]));
    await user.save();
    res.send(user);
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
