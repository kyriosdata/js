const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

function processaData(data) {
  console.log(`Data fornecida: ${data}`);
}

function pergunta() {
  rl.question("Forneça uma data (dd/mm/aaaa): ", verificaEntrada);
}

function verificaEntrada(entrada) {  
  const data = dataFromEntrada(entrada);
  if (data) {
    processaData(data);
    rl.close();
  } else {
    pergunta();  
  }
}

pergunta();




