/**
 * Extrai a raiz quadrada do número fornecido com a precisão
 * indicada. Um  método para extração da raiz quadrada baseado
 * em aproximações (talvez seja variante do método de Newton). 
 * 
 * Não há intenção em reinventar a roda. Aqui é apenas um 
 * exercício.
 * 
 * @param {number} n Número cuja raiz é desejada.
 * @param {number} precisao Precisão esperada para o cálculo da raiz.
 * 
 * @returns {number} A raiz quadrada do número fornecido com 
 * a precisão indicada.
 * 
 * @todo Tratar casos excepcionais e documentar (p.ex., valores negativos)
 * @todo Otimizar a atribuição ao valor r (simplificar a expressao, eliminar subtracao)
 * @todo A chamada ao método abs é desnecessária, calcular limites previamente. 
 */
function raiz(n, precisao) {
    let i = 1;
    let f = n;
    while (true) {
        let r = (f - i) / 2 + i;
        let quadrado = r * r;

        if (Math.abs(quadrado - n) < precisao) {
            return r;
        }

        if (quadrado > n) {
            f = r;
        } else {
            i = r;
        }
    }
}

module.exports = raiz;