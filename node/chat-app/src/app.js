/**
 * Base da aplicação
 * (útil para produção e também desenvolvimento)
 */
const express = require("express");
const path = require("path");

const healthRouter = require("./routers/health");

const app = express();

// JSON recebido é convertido em objeto.
app.use(express.json());

// Usa diretório "public" para disponibilizar static files
// ../x.png (o nome do diretório não faz parte da URL)
app.use(express.static(path.join(__dirname, "../public")));

app.use(healthRouter);

module.exports = app;
