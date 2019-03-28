
/**
 * Efetua a soma dos argumentos fornecidos.
 * 
 * @param {number} x Primeira parcela
 * @param {number} y Segunda parcela
 */
function soma(x, y) {
  return x + y;
}

// Espera-se que esta função seja usada não apenas neste
// arquivo, mas também por meio de chamadas contidas em
// outros arquivos. Em consequência, exportamos
// a função por meio de "exports" ao criar um módulo.

// module.exports é a referência para o objeto retornado
// por chamadas require(). Tais chamadas deverão ser 
// feitas em outros arquivos JS que vão fazer uso desta
// função.

exports.soma = soma;

