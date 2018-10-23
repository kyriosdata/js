// ES6 (import/export)

import Matematica from "./matematica";

/**
 * Função que faz uso de objeto por meio de "import" para
 * ilustrar reutilização de classe usando import/export.
 */
function principal() {
    const funcoes = new Matematica();

    // Requisita execução de métodos do objeto criado
    const soma = funcoes.soma(1, 2);
    const subtracao = funcoes.subtracao(1, 2);

    console.log("Exibe soma de 3 com -1");
    console.log(soma + subtracao);
}

principal();