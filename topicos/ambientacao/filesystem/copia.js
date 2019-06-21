/**
 * @module copia
 * @todo Criar testes.
 */
const fs = require("fs");

/**
 * Função que ilustra a criação da cópia de um arquivo. 
 * 
 * @todo Isolar interação com o usuário da cópia (aqui misturadas)
 * @todo Documentar adequadamente.
 */
function iniciar() {
    if (process.argv.length != 4) {
        console.log("Uso: node copia <arquivo> <destino>");
        process.exitCode = 0;
        return;
    }
    
    const origem = process.argv[2];
    const destino = process.argv[3];

    try {
        fs.copyFileSync(origem, destino);
    } catch (e) {
        console.log("Houve um erro, cópia não efetuada.");
        return;
    }
    
    console.log(`Arquivo ${origem} copiado para ${destino}`);
}

iniciar();
