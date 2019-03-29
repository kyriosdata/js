function raiz(n, delta) {
    let contador = 0;
    let i = 1;
    let f = n;
    while (true) {
        contador = contador + 1;
        let r = (f - i) / 2 + i;
        let quadrado = r * r;

        if (Math.abs(quadrado - n) < delta) {
            console.log(`Iteracoes realizadas: ${contador}`);
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