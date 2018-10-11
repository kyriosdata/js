// Exibe o primeiro argumento fornecido em letras maiúsculas.
// EXEMPLO:
// node maiuscula casa
// CASA

if (process.argv.length != 3) {
  console.log("Forneça um único argumento.");
  return;
}
 
console.log(process.argv[2].toUpperCase());
