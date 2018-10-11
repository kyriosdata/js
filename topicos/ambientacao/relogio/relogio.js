/**
 * Exibe o instante corrente na linha em questão e retorna o cursor para
 * o início da linha.
 */
function exibeInstanteCorrente() {
    process.stdout.write(new Date().toLocaleTimeString() + "\r");
};

console.log("Relogio (v 1.0.0) - Use Ctrl-C para interromper")

// Execute a função para exibir o instante corrente a cada segundo
setInterval(exibeInstanteCorrente, 1000);