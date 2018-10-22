const Matematica = require("./matematica");

/**
 * Encapsula obtenção das parcelas a serem somadas.
 */
function argumentos() {

    const a = parseInt(process.argv[2]);
    const b = parseInt(process.argv[3]);

    return [ a, b ];
}

/**
 * Executa soma dos argumentos fornecidos.
 */
function principal() {
    const funcoes = new Matematica();

    const [a, b] = argumentos();

    const soma = funcoes.soma(a, b);

    console.log(`A soma de ${a} e ${b} é ${soma}.`);
}

// Executa aplicação
principal();