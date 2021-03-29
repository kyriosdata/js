const express = require("express");
const multer = require("multer");
const User = require("../models/user");
const Auth = require("../middleware/seguranca");
const auth = require("../middleware/autenticacao");

const router = new express.Router();

// login - obtém token de acesso
// token obtido é persistido (acrescentado a lista de 'tokens')
// para que requisições posteriores possam empregá-lo
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
    // (token é definido a partir do id do usuário)
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
    // Remove token dentre aqueles produzidos
    const user = req.user;
    user.tokens = user.tokens.filter((e) => e.token !== req.token);
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
  await req.user.populate("tasks").execPopulate();
  console.log(req.user.tasks);
  console.log(Object.keys(req.user));
  res.send({ user: req.user, tasks: req.user.tasks });
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
    console.log(error.toString());
    res.status(401).send();
  }
});

router.delete("/users/me/avatar", auth, (req, res) => {
  try {
    req.user.avatar = undefined;
    req.user.save();
    res.send();
  } catch (error) {
    res.status(400).send();
  }
});

// UPLOAD
// Configura multer

const FIELD_UPLOAD = "upload";
const FIELD_AVATAR = "avatar";

// Deposita no diretório 'avatars' o arquivo carregado, com o
// mesmo nome (outra estratégia pode ser usada para evitar conflito)
const storage = multer.diskStorage({
  destination: "avatars",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const avatarOptions = {
  limits: {
    fileSize: 500000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Apenas arquivos PNG ou JPG são aceitos"));
    }

    cb(undefined, true);
  },
};

const avatar = multer(avatarOptions);
const upload = multer({ ...avatarOptions, storage });

// Parâmetro de nome 'avatar' deve indicar o arquivo a ser carregado
router.post(
  "/users/me/avatar",
  auth,
  avatar.single(FIELD_AVATAR),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Parâmetro de nome 'upload' (FIELD) deve indicar o arquivo a ser carregado
router.post(
  "/upload",
  upload.single(FIELD_UPLOAD),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
