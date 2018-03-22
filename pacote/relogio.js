const chalk = require('chalk');

/**
 * Exibe o instante corrente na linha em questão e retorna o cursor para
 * o início da linha.
 */
function exibeInstanteCorrente() {
    process.stdout.write(new Date().toLocaleTimeString() + "\r");

};

let nome = chalk.inverse("Relógio");
let versao = chalk.underline("v1.0.0");
let ctrc = chalk.gray("Use CTR-C para interromper");

console.log(nome);
console.log(versao);
console.log(ctrc);

// Execute a função para exibir o instante corrente a cada segundo
setInterval(exibeInstanteCorrente, 1000);