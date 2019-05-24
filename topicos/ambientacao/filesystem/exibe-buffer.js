/**
 * @module exibe-buffer
 * @todo Criar testes.
 * @todo provide a better name for this module
 */
const fs = require("fs");

/**
 * @todo documentar a função
 */
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

/**
 * @todo documentar a função
 * @todo usar letras maiúsculas,ou seja, CADE em vez de cade.
 */
function converteInteiroParaHexa(valor) {
    return valor.toString(16);
}

/**
 * @todo documentar a função
 */
function iniciar() {
    if (process.argv.length != 3) {
        console.log("Uso: node exibe-buffer <arquivo>");
        process.exitCode = 0;
        return;
    }
    
    const path = process.argv[2];
    const inteiro = leQuatroPrimeirosBytes(path);
    
    console.log(converteInteiroParaHexa(inteiro) || "Arquivo existe?");    
}

iniciar();