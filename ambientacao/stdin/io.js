const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Forneça uma data: ', (data) => {
  
  if (data && data.trim().lenght > 0) {
    console.log(`Data fornecida: ${data}`);
  } else {
    console.log("Preciso de uma data para prosseguir...");
  }

  rl.close();
});