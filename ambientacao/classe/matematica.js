/**
 * Operações matemáticas básicas.
 *
 * @type {module.Matematica}
 */
module.exports = class Matematica {

    /**
     * Produz a soma dos argumentos fornecidos.
     *
     * @param {number} a Um dos argumentos.
     * @param {number} b O outro argumento.
     * @returns {number} A soma dos argumentos.
     */
    soma(a, b) {
        return a + b;
    }
    
    subtracao(a, b) {
        return a - b;
    }
};
