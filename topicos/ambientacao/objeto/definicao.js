/**
 * @typedef Calcado
 * @type {object}
 * @property {string} identificador - O identificador único do calçado.
 * @property {number} numero - O número do calçado.
 * @property {string} marca - A marca do calçado.
 * @property {string} cor - A cor do calçado.
 * @property {boolean} vendido - Indica se o calçado está vendido ou não.
 */

 /**
  * Um calçado.
  * 
  * @type {Calcado}
  */
const sapato = {
    identificador : "123454555-234",
    numero : 42,
    marca: "Nike",
    cor: "azul",
    vendido : false
};

/**
 * Outro calçado.
 * 
 * @type {Calcado}
 */
const tenis = {
    "identificador" : "1",
    "numero" : 24,
    "marca" : "Nikon",
    "cor" : "branca",
    "vendido" : true
};

/**
 * Um outro calçado, com um atributo "diferente" dos
 * demais calçados.
 * 
 * @type {Calcado}
 */
const chuteira = {
    "marca do fabricante" : "Nike"
};

// Exporte para consumo por outros módulos, um objeto,
// composto por outros três objetos. 

module.exports = {
    sapato,
    tenis,
    chuteira
};