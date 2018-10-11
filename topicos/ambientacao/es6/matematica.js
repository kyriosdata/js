/**
 * VERSÃO EMPREGANDO ES6
 * 
 * Operações matemáticas básicas fornecidas apenas com o
 * único propósito de ilustrar como funções ou métodos podem oferecer
 * funcionalidas agrupadas em uma classe.
 *
 * <p>Adicionalmente, a presente classe também ilustra o uso de
 * <a href="http://usejsdoc.org/">JSDoc</a>.</p>
 *
 * @type {module.Matematica}
 */
export default class Matematica {

    /**
     * Produz a soma dos argumentos fornecidos.
     *
     * @param {number} a Um dos argumentos.
     * @param {number} b O outro argumento.
     *
     * @see {@link Matematica#subtracao}
     *
     * @returns {number} A soma dos argumentos.
     */
    soma(a, b) {
        return a + b;
    }

    /**
     * Produz a subtração entre o primeiro e o segundo argumento.
     *
     * @param a O valor do qual será feita a subtração.
     * @param b O valor a ser subtraído.
     *
     * @see {@link Matematica#soma}
     *
     * @returns {number} O resultado da subtração (a - b).
     */
    subtracao(a, b) {
        return a - b;
    }
}
