function raiz(n, delta) {
    let i = 1;
    let f = n;
    while (true) {
        let r = (f - i) / 2 + i;
        let quadrado = r * r;

        if (Math.abs(quadrado - n) < delta) {
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