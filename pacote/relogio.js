const chalk = require("chalk");
const cursor = require("cli-cursor");
const onDeath = require("death");

// Captura toda exceção ocrrida, inclusive SIGINT (CTRL-C)
onDeath(function() {
    console.log();
    console.log();
    console.timeEnd("Executado por");

    process.exit();
});

/**
 * Exibe o instante corrente na linha em questão e retorna o cursor para
 * o início da linha.
 */
function exibeInstanteCorrente() {
    process.stdout.write(new Date().toLocaleTimeString() + "\r");
};

/**
 * Limpa a tela.
 */
function limparTela() {
    process.stdout.write('\x1bc');
}

console.time("Executado por");

cursor.hide();
limparTela();
console.log();
console.log(chalk.blue.bgWhite.bold("Relógio (v1.0.0)"));
console.log(chalk.gray("Use CTR-C para interromper"));

exibeInstanteCorrente(); // Imediatamente exibe o instante corrente
setInterval(exibeInstanteCorrente, 1000);