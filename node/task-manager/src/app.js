const express = require("express");
require("./db/mongoose-connected");

const taskRouter = require("./routers/task");
const userRouter = require("./routers/user");
const healthRouter = require("./routers/health");

const app = express();

// JSON recebido é convertido em objeto.
app.use(express.json());
app.use(taskRouter);
app.use(userRouter);
app.use(healthRouter);

module.exports = app;
