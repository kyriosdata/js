const express = require("express");
require("./db/mongoose");

const taskRouter = require("./routers/task");
const userRouter = require("./routers/user");

const app = express();
const port = process.env.PORT || 3000;

// JSON recebido é convertido em objeto.
app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

// Apenas para verificar funcionamento (health)
app.get("", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log("Server está em execuçao na porta " + port);
});
