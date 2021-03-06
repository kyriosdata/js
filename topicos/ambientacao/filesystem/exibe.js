/**
 * @module exibe
 * @todo Criar testes.
 */

const fs = require("fs");

/**
 * Exibe o conteúdo de um arquivo. Assume que se trata de um arquivo
 * texto usando o encoding UTF-8.
 *
 * @param arquivo Nome do arquivo.
 */
function exibeArquivoUtf8(arquivo) {
    fs.readFile(arquivo, "utf-8", function (e, d) {
        console.log(e ? "Arquivo não existe: " + arquivo : d);
    });
}

function iniciar() {
    if (process.argv.length !== 3) {
        console.log("Uso: node exibe <arquivo>");
        process.exitCode = 0;
        return;
    }
    
    const path = process.argv[2];
    exibeArquivoUtf8(path);
}

iniciar();