const chalk = require("chalk");
const validator = require("validator");
const notes = require("./notes");

const notas = notes.getNotes();

console.log("NOTAS APP");
console.log(notas);
console.log(validator.isEmail("123@ufg.br"));
console.log(chalk.green("sucesso!"));
console.log(chalk.bgGreen("sucesso"));
