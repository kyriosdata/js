/**
 * Quando se executa o Node.js, informações sobre o
 * processo correspondente podem ser capturadas
 * por meio do objeto "process". 
 * 
 * Em particular, "process.argv" retorna o vetor
 * contendo os argumentos fornecidos via linha de
 * comandos quando o processo foi iniciado.
 * IMPORTANTE: as duas primeiras entradas,
 * process.argv[0] e process.argv[1], respectivamente,
 * fornecem o nome do processo (node) e o nome do 
 * arquivo JavaScript executado. Ou seja, é a partir
 * de process.argv[2] que seguem os argumentos
 * fornecidos ao programa.
 * 
 * {@link exibeArgumentos}
 */
function exibeArgumentosAlternativo() {
    process.argv.forEach((e,i) => console.log(`${i} : ${e}`));
}

exibeArgumentosAlternativo();
