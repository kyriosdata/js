/**
 * @module cria
 * @todo Criar testes.
 */

 const fs = require("fs");

/**
 * Acrescenta texto em um arquivo usando o enconding UTF-8.
 *
 * @param arquivo O nome do arquivo.
 * @param texto O texto a ser acrescentado.
 * 
 * @todo Documentar retorno da função.
 */
function acrescentaTextoEmArquivo(arquivo, texto) {
    try {
        fs.appendFileSync(arquivo, texto, "utf8");
        return true;
    } catch (erro) {
        return false;
    }
}

/**
 * @todo Documentar a função. 
 */
function iniciar() {
    if (process.argv.length !== 4) {
        console.log("Uso: node cria <arquivo> <conteúdo>");
        process.exitCode = 0;
        return;
    }
    
    let path = process.argv[2];
    let conteudo = process.argv[3];
    console.log(acrescentaTextoEmArquivo(path, conteudo));
}

iniciar();