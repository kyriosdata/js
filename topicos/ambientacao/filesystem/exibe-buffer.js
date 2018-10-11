const fs = require('fs');

if (process.argv.length != 3) {
    console.log("Uso: node exibe-buffer <arquivo>");
    process.exitCode = 0;
    return;
}

const path = process.argv[2];

function leQuatroPrimeirosBytes(path) {
    try {
        let arquivo = fs.openSync(path, "r");
        let buffer = Buffer.alloc(4);
        let bytesLidos = fs.readSync(arquivo, buffer, 0, 4, 0);
        if (bytesLidos < 4) {
            return undefined;
        }

        return buffer.readUInt32BE(0, 4);
    } catch (erro) {
        return undefined;
    }
}

function converteInteiroParaHexa(valor) {
    return valor.toString(16);
}

const inteiro = leQuatroPrimeirosBytes(path);

console.log(converteInteiroParaHexa(inteiro) || "Arquivo existe?");
