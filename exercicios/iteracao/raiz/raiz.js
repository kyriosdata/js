function raiz(n, delta) {
    let i = 1;
    let f = n;
    while (true) {
        let r = (f - i) / 2 + 1;
        let quadrado = r * r;

        if (Math.abs(quadrado - n) < delta) {
            return r;
        }
    }
}