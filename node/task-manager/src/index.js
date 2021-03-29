const express = require("express");
const mongoose = require("mongoose");

require("./db/mongoose");

const taskRouter = require("./routers/task");
const userRouter = require("./routers/user");

const app = express();
const port = process.env.PORT || 21002;

// Express middleware (intercept every request)

// JSON recebido é convertido em objeto.
app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

// Apenas para verificar funcionamento (health)
app.get("", (req, res) => {
  res.send({
    mongoose: mongoose.connection.readyState,
    user: process.env.MONGODB_USER,
    server: process.env.MONGODB_SERVER,
    port: process.env.MONGODB_PORT,
    dbname: process.env.MONGODB_DBNAME,
  });
});

app.listen(port, () => {
  console.log("Server está em execuçao na porta " + port);
});