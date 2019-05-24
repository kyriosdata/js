/**
 * @module verifica-jpeg
 * @todo criar testes
 */
const fs = require("fs");

/**
 * Verifica se o arquivo fornecido contém os marcadores esperados
 * em um arquivo JPEG, ou seja, inicia pelos bytes FFD8 e termina
 * com os bytes FFD9.
 *
 * @param path O nome do arquivo a ser verificado.
 * @returns {boolean} O valor true se os marcadores estão
 * presentes no arquivo ou false, caso contrário.
 */
function verificaPresencaMarcadoresJpeg(path) {
    function leDoisBytes(arquivo, position = 0) {
        const buffer = Buffer.alloc(2);
        const lidos = fs.readSync(arquivo, buffer, 0, 2, position);
        return lidos < 2 ? undefined : buffer.readUInt16BE(0, 2);
    }

    try {
        // Obtém o tamanho do arquivo
        const size = fs.statSync(path).size;

        const arquivo = fs.openSync(path, "r");
        const doisPrimeiros = leDoisBytes(arquivo, 0);
        const doisUltimos = leDoisBytes(arquivo, size - 2);
        fs.closeSync(arquivo);

        return (doisPrimeiros === 65496) && (doisUltimos === 65497);
    } catch (erro) {
        console.error(erro);
        return false;
    }
}

/**
 * @todo documentar
 */
function iniciar() {
    if (process.argv.length !== 3) {
        console.log("Uso: node verifica-jpeg <arquivo JPEG>");
        process.exitCode = 0;
    } else {
        const path = process.argv[2];
        
        // TODO substituir por "O arquivo <arquivo> [não] possui marcação JPEG"
        console.log(verificaPresencaMarcadoresJpeg(path));
    }
}

iniciar();
