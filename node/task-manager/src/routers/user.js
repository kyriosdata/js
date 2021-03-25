const express = require("express");
const User = require("../models/user");
const Auth = require("../middleware/auth");

const router = new express.Router();

/**
 * Função 'middleware' que é executada com a finalidade de autenticação.
 * Precisa ser fornecida como segundo parâmetro para cada router
 * que depender de autenticação.
 *
 * Adicionalmente, router configurado só será chamado se método
 * 'next' for chamado e, por fim, se autenticação for realizada com
 * sucesso, então a requisição será acrescida do campo 'user' com
 * o perfil do usuário em questão.
 *
 * IMPORTANTE. Esta função usa a base de dados para verificar se token
 * fornecido está válido, ou seja, não ocorreu logout.
 *
 * @param {object} req Requisição conforme recebida pelo Express
 * @param {object} res Resposta conforme disponibilizada pelo Epress
 * @param {function} next Função a ser chamada para encaminhar para router
 */
const auth = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    const token = Auth.extractTokenFromHeader(header);
    const decoded = Auth.decodeToken(token);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("usuario/token nao encontrado");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("auth error", error.toString());
    res.status(401).send({ error: "Exige autenticação..." });
  }
};

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

router.post("/users/logout", auth, (req, res) => {
  try {
    // Obtém token a ser removido
    const header = req.header("Authorization");
    const token = Auth.extractTokenFromHeader(header);

    // Remove token dentre aqueles produzidos
    const user = req.user;
    user.tokens = user.tokens.filter((e) => e.token !== token);
    console.log(user);
    user.save();

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
    const total = await User.countDocuments({});
    res.status(201).send({ created: user, total });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.toString());
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

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
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
