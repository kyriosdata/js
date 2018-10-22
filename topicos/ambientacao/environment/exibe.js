/**
 * Exibe as variáveis de ambiente definidas e os respectivos valores, 
 * uma por linha, em ordem alfabética. Consulte detalhes em 
 * <a href="https://nodejs.org/api/process.html#process_process_env">
 * process.env</a>.
 * 
 * <p>Foi empregado o método <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys">
 * Object.keys</a> que retorna um vetor contendo os nomes das propriedades do 
 * objeto fornecido como argumento.</p>
 */
function exibeVariaveisDeAmbiente() {
    Object.keys(process.env)
        .sort()
        .forEach(e => console.log(`${e} : ${process.env[e]}`));
}

exibeVariaveisDeAmbiente();
