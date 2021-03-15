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
app.post("/user", (req, res) => {
  const user = new User(req.body);
  let saved_id = -1;
  user
    .save()
    .then((x) => {
      saved_id = x._id;
      return User.countDocuments({});
    })
    .then((c) => res.send({ saved: saved_id, total: c }))
    .catch((e) => res.status(500).send({ erro: e }));
});

// User.countDocuments({}, (e, c) => {
//   if (e) {
//     res.send({ erro: e });
//   } else {
//     res.send({ type: "User", total: c });
//   }
// });

// Acrescentar tarefa
app.post("/task", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((x) => {
      res.status(201);
      res.send({ saved: x._id });
    })
    .catch((e) => res.status(500).send({ erro: e }));
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

const deleteTaskWithTotalReturned = async (id) => {
  const task = await Task.findById(id);
  if (task) {
    await task.deleteOne();
  }
  return await Task.countDocuments({});
};

app.delete("/task/:id", (req, res) => {
  deleteTaskWithTotalReturned(req.params.id)
    .then((total) => res.send({ total }))
    .catch((e) => res.status(500).send(e));
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
