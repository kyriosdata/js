const chalk = require("chalk");
const validator = require("validator");
const notes = require("./notes");

const notas = notes.getNotes();

console.log("MINHAS NOTAS APP");
console.log(notas);
console.log(chalk.green("sucesso!"));
