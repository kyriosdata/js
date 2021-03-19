const express = require("express");
const Task = require("../models/task");

const router = new express.Router();

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

router.delete("/task/:id", async (req, res) => {
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

router.get("/task", (req, res) => {
  Task.find({})
    .then((r) => {
      res.setHeader("total", r.length);
      res.send(r);
    })
    .catch((e) => res.status(500).send(e));
});

// Contar total de tarefas
router.get("/task/count", (req, res) => {
  Task.countDocuments({}, (e, c) => {
    if (e) {
      res.status(500).send({ erro: e });
    } else {
      res.send({ type: "Task", total: c });
    }
  });
});

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

module.exports = router;
