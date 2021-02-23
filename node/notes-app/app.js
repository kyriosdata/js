const chalk = require("chalk");
const validator = require("validator");
const yargs = require("yargs");
const notes = require("./notes");

// Configura a versão
yargs.version("1.23.0-beta");

// Comando add
yargs.command({
  command: "add",
  describe: "Adiciona uma nota",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body of note",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (args) {
    notes.addNote(args.title, args.body);
  },
});

// Comando remove
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note´s title to remove",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (args) {
    notes.removeNote(args.title);
  },
});

// Comando list
yargs.command({
  command: "list",
  describe: "list all notes",
  handler: () => {
    console.log("list of my notes..");
  },
});

// Comando read
yargs.command({
  command: "read",
  describe: "read a specific note",
  handler: () => console.log("show the specific note"),
});

// Título da aplicação
console.log("MINHAS NOTAS APP");

const notas = notes.getNotes();

yargs.parse();
