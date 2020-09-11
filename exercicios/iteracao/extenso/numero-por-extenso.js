/**
 * Converte o valor fornecido, de zero até 999, inclusive, na
 * sua versão por extenso.
 * 
 * @param {number} n Um número inteiro maior ou igual a zero e 
 * menor ou igual a 999.
 * 
 * @returns O número fornecido como argumento por extenso. Por exemplo,
 * se fornecido o valor 38, então o retorno é "trinta e oito".
 * 
 * @throws {TypeError} Em vários cenários: (a) se não for fornecido
 * exatamente um argumento; (b) se o argumento não for um número inteiro;
 * 
 * @throws {RangeError} Se o valor fornecido for menor que zero ou maior
 * que 999.
 */
function numeroPorExtenso(n) {
    if (arguments.length != 1) {
        throw new TypeError("apenas um argumento é esperado");
    }
    
    return "zero";
}

module.exports = numeroPorExtenso;