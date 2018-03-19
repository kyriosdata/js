const fs = require('fs');

if (process.argv.length != 3) {
    console.log("Uso: node verifica-jpeg <arquivo JPEG>");
    process.exitCode = 0;
    return;
}

const path = process.argv[2];

function verificaMarcadoresEmJpeg(path) {
    function leDoisBytes(arquivo, position = 0) {
        let buffer = Buffer.alloc(2);
        let lidos = fs.readSync(arquivo, buffer, 0, 2, position);
        return lidos < 2 ? undefined : buffer.readUInt16BE(0, 2).toString(16);
    }

    try {
        // Obtém o tamanho do arquivo
        let size = fs.statSync(path).size;

        let arquivo = fs.openSync(path, "r");
        let doisPrimeiros = leDoisBytes(arquivo, 0);
        let doisUltimos = leDoisBytes(arquivo, size - 2);

        return doisPrimeiros == "ffd8" && doisUltimos == "ffd9";
    } catch (erro) {
        return false;
    }
}

console.log(verificaMarcadoresEmJpeg(path));