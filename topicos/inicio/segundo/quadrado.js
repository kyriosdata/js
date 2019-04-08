// Exibe informação sobre a aplicação na saída padrão
console.log("quadrado (versão 1.0.0)");
console.log("(meu segundo aplicativo em JavaScript)");

// Função que retorna o quadrado do valor fornecido
function quadrado(x) {
  return x * x;
}

// Apenas salta uma linha
console.log("");

// Se foi fornecido argumento para o aplicativo
// trate-o como um número cujo quadrado é desejado.
// Caso contrário, assuma o valor 2.

const numero = process.argv.length > 2 ? parseInt(process.argv[2]) : 2;
console.log(`O quadrado de ${numero} é ${quadrado(numero)}.`);
