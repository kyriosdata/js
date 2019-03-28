// TODO design separar cópia da interação com o usuário.
// TODO documentar adequadamente.

const fs = require("fs");

/**
 * Função que ilustra a criação da cópia de um arquivo. 
 */
function iniciar() {
    if (process.argv.length != 4) {
        console.log("Uso: node copia <arquivo> <destino>");
        process.exitCode = 0;
        return;
    }
    
    let origem = process.argv[2];
    let destino = process.argv[3];

    try {
        fs.copyFileSync(origem, destino);
    } catch (e) {
        console.log("Houve um erro, cópia não efetuada.");
        return;
    }
    
    console.log(`Arquivo ${origem} copiado para ${destino}`);
}

iniciar();
