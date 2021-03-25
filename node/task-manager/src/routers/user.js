const express = require("express");
const User = require("../models/user");
const Auth = require("../middleware/seguranca");
const auth = require("../middleware/autenticacao");

const router = new express.Router();

// login - obtém token de acesso
// token obtido é persistido (acrescentado a lista de 'tokens')
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("usuario desconhecido");
    }

    // Verifica se a senha fornecida é compatível com o valor de
    // hash armazenado em user.password
    await Auth.verificaHash(req.body.password, user.password);

    // NESTE PONTO A CREDENCIAL (user/password)
    // FOI VERIFICADA DE FORMA SATISFATORIA

    // Cria o token e persiste com o usuário
    const token = Auth.codeToken(user._id);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "não foi possível login" });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    // Obtém token a ser removido
    const header = req.header("Authorization");
    console.log(header);
    const token = Auth.extractTokenFromHeader(header);

    // Remove token dentre aqueles produzidos
    const user = req.user;
    user.tokens = user.tokens.filter((e) => e.token !== token);
    console.log(user);
    await user.save();

    res.send();
  } catch (error) {
    console.log(error);
    res.status(401).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(401).send();
  }
});

// Acrescentar usuário
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.toString());
  }
});

// Atualiza usuário (evita getByIdAndUpdate para não pular middleware)
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["email", "password"];
  const isValidOperation = updates.every((update) => allowed.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    updates.forEach((change) => (req.user[change] = req.body[change]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    console.log(e.toString());
    res.status(400).send({ erro: e });
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
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

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send();
  } catch (error) {
    res.status(401).send();
  }
});

module.exports = router;
