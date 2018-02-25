const fs = require('fs');

if (process.argv.length != 4) {
    console.log("Uso: node cria <arquivo> <conteúdo>");
    process.exitCode = 0;
    return;
}

let path = process.argv[2];
let conteudo = process.argv[3];

function callback(erro) {
    if (erro) {
        console.log("Ocorreu um erro, não foi possível criar arquivo...");
        console.log(erro);
    } else {
        console.log("Arquivo criado satisfatoriamente: " + path);
    }
}

fs.exists(path, existe => {
    if (existe) {
        fs.appendFile(path, conteudo, erro => {
            if (erro) {
                console.log(erro);
            } else {
                console.log("Conteúdo acrescentado ao arquivo.");
            }
        });
    } else {
        fs.writeFile(path, conteudo, callback);
    }
});



