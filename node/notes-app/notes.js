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
  const indice = notes.find((note) => note.title === title);
  if (indice) {
    console.log("Note with title '%s' already in use", title);
    return;
  }

  notes.push({ title: title, body: body });
  saveNotes(notes);
  console.log("New note added");
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
};
