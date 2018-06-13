const readline = require("readline");

// ESLint (define variáveis globais)
/* global console, require, process */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Produz uma data para a sequência de caracteres
 * fornecida ou o valor null, caso a sequência
 * não contenha uma data no formato dd/mm/aaaa.
 */
function dataFromEntrada(entrada) {
  let data = null;
  if (entrada.match(/^(\d{2}\/\d{2}\/\d{4})$/)) {
    try {
      data = new Date(entrada);
      data.toISOString();
    } catch (e) {
      data = null;
    }
  }

  return data;
}

function exibeData(data) {
  console.log(`Data fornecida: ${data}`);
}

function pergunta() {
  rl.question("Forneça uma data (dd/mm/aaaa): ", processaEntrada);
}

/**
 * Verifica se entrada está no padrão dd/mm/aaaa e, 
 * enquanto não estiver, requisita nova entrada.
 */
function processaEntrada(entrada) {  
  const data = dataFromEntrada(entrada);
  if (data) {
    exibeData(data);
    rl.close();
  } else {
    pergunta();  
  }
}

// Início da aplicação.
pergunta();