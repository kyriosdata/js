const argumentos = require("./recuperaArgumentos");

/**
 * Apenas exibe soma dos argumentos fornecidos.
 */
function programa() {
    const [ p1, p2 ] = argumentos.recupera(process.argv);

    console.log(`Soma dos argumentos é ${p1 + p2}`);
}

programa();