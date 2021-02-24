const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  console.log(chalk.green("Your notes"));
  const notes = loadNotes();

  notes.forEach((note) => console.log(`${note.title} : ${note.body}`));
};

function loadNotes() {
  try {
    const bufferData = fs.readFileSync("notes.json");
    const jsonData = bufferData.toString();
    return JSON.parse(jsonData);
  } catch (e) {
    return [];
  }
}

function saveNotes(notes) {
  const notesJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJson);
}

function addNote(title, body) {
  const notes = loadNotes();
  const noteFind = notes.find((note) => note.title === title);
  if (noteFind) {
    console.log(chalk.red.inverse(`Note with title ${title} already in use`));
    return;
  }

  notes.push({ title: title, body: body });
  saveNotes(notes);
  console.log(chalk.green.inverse("New note added"));
}

function removeNote(title) {
  const notes = loadNotes();
  const excluido = notes.filter((note) => note.title !== title);

  if (excluido.length !== notes.length) {
    saveNotes(excluido);
    console.log(chalk.bgGreen("Note removed with title", title));
  } else {
    console.log(chalk.bgRed("No note founud with title", title));
  }
}

function readNote(title) {
  const notes = loadNotes();
  const note = notes.find((n) => n.title === title);
  if (note) {
    console.log("Title: " + chalk.green(note.title));
    console.log("Body: " + note.body);
  } else {
    console.log("There is no note with title", title);
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
};
