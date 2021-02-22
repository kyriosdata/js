const fs = require("fs");

//fs.writeFileSync("notes.txt", "sempre a primeira linha");

fs.appendFileSync("notes.txt", "conteúdo");
