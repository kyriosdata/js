// Módulo que define três objetos, todos eles exportados: sapato, tenis e chuteira.
// Um objeto é uma coleção de propriedades.
// Cada propriedade possui um nome e um valor, conforme ilustrado abaixo.

let sapato = {
    identificador : "123454555-234",
    numero : 42,
    marca: "Nike",
    cor: "azul",
    vendido : false
};

// Também é comum o uso de aspas para definir o nome da propriedade

let tenis = {
    "identificador" : "1",
    "numero" : 24,
    "marca" : "Nikon",
    "cor" : "branca",
    "vendido" : true
};

// O uso de aspas é obrigado no caso abaixo...

let chuteira = {
    "marca do fabricante" : "Nike"
};

// Exporte para consumo por outros módulos, um objeto,
// composto por outros três objetos. 

module.exports = {
    sapato,
    tenis,
    chuteira
};