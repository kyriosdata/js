const obj = require("./definicao");

/**
 * Função que ilustra uso de objeto definido em outro módulo.
 */
function programa() {
    
    // Como ter acesso aos valores das propriedades?
    console.log(obj.sapato.numero);
    console.log(obj.tenis.cor);
    console.log(obj.chuteira["marca do fabricante"]);

    // Propriedade inexistente resulta em undefined
    console.log(obj.sapato.propriedadeDesconhecida);
}

programa();