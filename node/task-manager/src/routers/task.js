const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/autenticacao");

const router = new express.Router();

// Acrescentar tarefa
router.post("/task", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user._id });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.send(500).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    await req.user.populate("tasks").execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/task/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["description", "completed"];
  const isValid = updates.every((change) => allowed.includes(change));
  if (!isValid) {
    return res.status(404).send({ error: "invalid udate" });
  }

  try {
    // Recupera a tarefa a ser atualizada.
    const tarefa = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!tarefa) {
      res.stats(404).send();
    }

    // Atualiza com valores fornecidos (permitidos, conforme acima)
    updates.forEach((change) => (tarefa[change] = req.body[change]));

    await tarefa.save();

    res.send({ alterada: alterada.description, nova });
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
