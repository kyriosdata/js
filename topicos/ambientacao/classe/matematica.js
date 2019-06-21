/**
 * Operações matemáticas básicas fornecidas apenas com o
 * único propósito de ilustrar como funções ou métodos podem oferecer
 * funcionalidas encapsuladas por uma classe.
 *
 * <p>Adicionalmente, a presente classe também ilustra o uso de
 * <a href="http://usejsdoc.org/">JSDoc</a>.</p>
 *
 * @type {module.Matematica}
 */
class Matematica {
  /**
   * Produz a soma dos argumentos fornecidos.
   *
   * @param {number} a A primeira parcela.
   * @param {number} b A segunda parcela.
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
   * @param {number} a O minuendo (o valor do qual será feita a subtração).
   * @param {number} b O subtraendo (o valor a ser subtrído).
   *
   * @see {@link Matematica#soma}
   *
   * @returns {number} O resultado da subtração (a - b).
   */
  subtracao(a, b) {
    return a - b;
  }

  /**
   * Produz a divisão de a por b.
   *
   * @param {number} a O dividendo.
   * @param {number} b O divisor.
   *
   * @returns {number} O quociente de a dividido por b.
   *
   * @throws {TypeError} Se qualquer um dos argumentos não for um número.
   * @throws {RangeError} Se o divisor é zero.
   */
  divisao(a, b) {
    if (isNaN(a)) {
      throw new TypeError(`dividendo ${a} não é um número`);
    }

    if (isNaN(b)) {
      throw new TypeError(`divisor ${b} não é um número`);
    }

    if (b == 0) {
      throw new RangeError("divisor não pode ser zero");
    }

    return a / b;
  }
}

module.exports = Matematica;
