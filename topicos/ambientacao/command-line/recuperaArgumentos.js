/**
 * Recupera os dois argumentos (primeiros) fornecidos no vetor. Observe
 * que se o vetor fornecido é "process.argv", então os dois primeiros
 * argumentos deste vetor serão ignorados.
 * 
 * @param {[number]} argumentos Vetor contendo argumentos, possivelmente 
 * "process.argv".
 */
function recuperaDoisArgumentosLinhaDeComandos(argumentos) {

    const tamanho = argumentos === process.argv ? 4 : 2;

    if (argumentos.length != tamanho) {
        throw Error("uso correto exige dois argumentos");
    }

    const parcela1 = parseInt(argumentos[tamanho - 2]);
    const parcela2 = parseInt(argumentos[tamanho - 1]);

    return [parcela1, parcela2];
}

exports.recupera = recuperaDoisArgumentosLinhaDeComandos;