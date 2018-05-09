const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Forneça uma data no formato dd/mm/aaaa? ', (data) => {
  
  console.log(`Data fornecida: ${data}`);

  rl.close();
});