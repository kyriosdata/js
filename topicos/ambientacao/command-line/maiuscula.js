// Exibe o primeiro argumento fornecido em letras maiúsculas.
// EXEMPLO:
// node maiuscula casa
// CASA

/**
 * Recupera entrada (argumento fornecido ao programa via linha de comandos)
 */
function getEntrada() {
    return process.argv[2];
}

function entradaValida() {
    return process.argv.length == 3;    
}
function principal() {
    if (entradaValida()) {
        console.log(getEntrada().toUpperCase());
    } else {
        console.log("Forneça um único argumento.");
    }
}

principal();
