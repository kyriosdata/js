const express = require("express");
const Task = require("../models/task");

const router = new express.Router();

// Acrescentar tarefa
router.post("/task", async (req, res) => {
  try {
    const created = await new Task(req.body).save();
    const total = await Task.countDocuments({});
    res.send({ saved: created._id, total });
  } catch (e) {
    res.send(500).send(e);
  }
});

router.get("/task/:id", (req, res) => {
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

router.patch("/task/:id", async (req, res) => {
  const nova = req.body.description;
  try {
    const alterada = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: false,
      useFindAndModify: false,
      runValidators: true,
    });

    if (!alterada) {
      res.stats(404).send();
    } else {
      res.send({ alterada: alterada.description, nova });
    }
  } catch (e) {
    res.status(400).send({ erro: e });
  }
});

router.delete("/tasks/:id", async (req, res) => {
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

router.delete("/todas/tasks", async (req, res) => {
  try {
    const removidos = await Task.deleteMany({});
    if (removidos) {
      res.send({ removidos });
    } else {
      res.status(400).send({ erro: "nenhum removido" });
    }
  } catch (erro) {
    res.status(400).send({ erro });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tarefas = await Task.find({});
    if (tarefas) {
      res.setHeader("total", tarefas.length);
      res.send(tarefas);
    } else {
      res.send({ erro: "nenhuma tarefa encontrada" });
    }
  } catch (erro) {
    res.status(400).send({ erro });
  }
});

// Contar total de tarefas
router.get("/total/tasks", async (req, res) => {
  try {
    const total = await Task.countDocuments({});
    res.send({ type: "Task", total });
  } catch (e) {
    res.status(400).send({ erro: e });
  }
});

module.exports = router;
