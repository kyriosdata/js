const notes = require("./notes");
var validator = require("validator");

const notas = notes.getNotes();

console.log("NOTAS APP");
console.log(notas);
console.log(validator.isEmail("foo@bar.com"));
