const fs = require("fs");

function getNotes() {
  return "Your notes...";
}

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
    console.log("Note with title '%s' already in use", title);
    return;
  }

  notes.push({ title: title, body: body });
  saveNotes(notes);
  console.log("New note added");
}

function removeNote(title) {
  const notes = loadNotes();
  const excluido = notes.filter((note) => note.title !== title);

  if (excluido.length !== notes.length) {
    saveNotes(excluido);
    console.log("Note with title '%s' removed.", title);
    return;
  } else {
    console.log("No note with title %s", title);
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
};
