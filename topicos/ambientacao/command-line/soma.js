/**
 * Obtém parcelas (argumentos de entrada).
 */
function obtemParcelas() {
    const parcela1 = parseInt(process.argv[2]);
    const parcela2 = parseInt(process.argv[3]);

    return [parcela1, parcela2];
}

/**
 * Apenas exibe soma dos argumentos fornecidos.
 */
function programa() {
    const [ p1, p2 ] = obtemParcelas();

    console.log(p1 + p2);
}

programa();