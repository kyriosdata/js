const fs = require('fs');

if (process.argv.length != 4) {
    console.log("Uso: node copia <arquivo> <destino>");
    process.exitCode = 0;
    return;
}

let origem = process.argv[2];
let destino = process.argv[3];

try {
    fs.copyFileSync(origem, destino);
} catch (e) {
    console.log("Houve um erro, cópia não efetuada.");
    return;
}

console.log(`Arquivo ${origem} copiado para ${destino}`);
