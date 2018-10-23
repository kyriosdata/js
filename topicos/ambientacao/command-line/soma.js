/**
 * Obtém parcelas (argumentos de entrada).
 */
function recuperaDoisArgumentosLinhaDeComandos() {

    // Observe que dois primeiros argumentos são o node e a própria aplicação
    if (process.argv.length != 4) {
        throw Error("uso correto exige dois argumentos");
    }

    const parcela1 = parseInt(process.argv[2]);
    const parcela2 = parseInt(process.argv[3]);

    return [parcela1, parcela2];
}

/**
 * Apenas exibe soma dos argumentos fornecidos.
 */
function programa() {
    const [ p1, p2 ] = recuperaDoisArgumentosLinhaDeComandos();

    console.log(`Soma dos argumentos é ${p1 + p2}`);
}

programa();