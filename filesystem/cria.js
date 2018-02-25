const fs = require('fs');

if (process.argv.length != 4) {
    console.log("Uso: node cria <arquivo> <conteúdo>");
    process.exitCode = 0;
    return;
}

let path = process.argv[2];
let conteudo = process.argv[3];

fs.appendFile(path, conteudo, erro => {
    if (erro) {
        console.log(erro);
    } else {
        console.log("Conteúdo acrescentado ao arquivo.");
    }
});




