const fs = require('fs');

if (process.argv.length !== 3) {
    console.log("Uso: node exibe <arquivo>");
    process.exitCode = 0;
    return;
}

const path = process.argv[2];

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

exibeArquivoUtf8(path);