const express = require("express");
require("./db/mongoose");

const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

// JSON recebido é convertido em objeto.
app.use(express.json());

// Apenas para verificar funcionamento (health)
app.get("", (req, res) => {
  res.send("ok");
});

// Acrescentar usuário
app.post("/user", async (req, res) => {
  try {
    const created = await new User(req.body).save();
    const total = await User.countDocuments({});
    res.send({ saved: created._id, total });
  } catch (e) {
    res.status(500).send(e);
  }
});

// Acrescentar tarefa
app.post("/task", async (req, res) => {
  try {
    const created = await new Task(req.body).save();
    const total = await Task.countDocuments({});
    res.send({ saved: created._id, total });
  } catch (e) {
    res.send(500).send(e);
  }
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

app.get("/user/:id", (req, res) => {
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

app.get("/task/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((u) => {
      if (!u) {
        res.status(404).send({ msg: "Nenhuma tarefa com o id fornecido" });
      } else {
        res.send(u);
      }
    })
    .catch((e) => res.status(500).send(e));
});

app.patch("/task/:id", async (req, res) => {
  const nova = req.body.description;
  try {
    const alterada = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: false,
      runValidators: true,
    });

    if (!alterada) {
      res.send(404).send();
    } else {
      res.send({ alterada: alterada.description, nova });
    }
  } catch (e) {
    res.status(400).send({ erro: e });
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) {
      const total = await Task.countDocuments({});
      res.send({ total, deleted: task });
    } else {
      res.send(404).send();
    }
  } catch (e) {
    res.status(400).send({ erro: e });
  }
});

app.get("/task", (req, res) => {
  Task.find({})
    .then((r) => {
      res.setHeader("total", r.length);
      res.send(r);
    })
    .catch((e) => res.status(500).send(e));
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

// Contar total de tarefas
app.get("/task/count", (req, res) => {
  Task.countDocuments({}, (e, c) => {
    if (e) {
      res.status(500).send({ erro: e });
    } else {
      res.send({ type: "Task", total: c });
    }
  });
});

app.listen(port, () => {
  console.log("Server está em execuçao na porta " + port);
});
