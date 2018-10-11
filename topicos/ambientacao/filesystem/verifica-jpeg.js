const fs = require('fs');

if (process.argv.length !== 3) {
  console.log("Uso: node verifica-jpeg <arquivo JPEG>");
  process.exitCode = 0;
  return;
}

const path = process.argv[2];

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
    let buffer = Buffer.alloc(2);
    let lidos = fs.readSync(arquivo, buffer, 0, 2, position);
    return lidos < 2 ? undefined : buffer.readUInt16BE(0, 2);
  }

  try {
    // Obtém o tamanho do arquivo
    let size = fs.statSync(path).size;

    let arquivo = fs.openSync(path, "r");
    let doisPrimeiros = leDoisBytes(arquivo, 0);
    let doisUltimos = leDoisBytes(arquivo, size - 2);
    fs.closeSync(arquivo);

    return doisPrimeiros === 65496 && doisUltimos === 65497;
  } catch (erro) {
    console.error(erro);
    return false;
  }
}

// TODO substituir por "O arquivo <arquivo> [não] possui marcação JPEG"
console.log(verificaPresencaMarcadoresJpeg(path));
