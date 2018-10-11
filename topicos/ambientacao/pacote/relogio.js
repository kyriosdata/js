const chalk = require("chalk");
const cursor = require("cli-cursor");
const onDeath = require("death");

/**
 * Limpa a tela.
 */
function limparTela() {
    process.stdout.write('\x1bc');
}

/**
 * Exibe o instante corrente na linha em questão e retorna o cursor para
 * o início da linha.
 */
function exibeInstanteCorrente() {
    process.stdout.write(new Date().toLocaleTimeString() + "\r");
}

// Captura toda exceção ocorrida, inclusive SIGINT (CTRL-C)
onDeath(function() {
    console.log();
    console.log();
    console.timeEnd("Executado por");

    process.exit();
});

// Cria um "cronômetro identificado por 'Executado por'"
console.time("Executado por");

cursor.hide();
limparTela();
console.log();
console.log(chalk.blue.bgWhite.bold("Relógio (v1.0.0)"));
console.log(chalk.gray("Use CTR-C para interromper"));

// Imediatamente exibe o instante corrente
exibeInstanteCorrente(); 

// Exibe o instante corrente a cada segundo
setInterval(exibeInstanteCorrente, 1000);