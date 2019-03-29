const raiz = require("../raiz");

test("caso simples",() => {
    expect(raiz(4, 0.001)).toBeCloseTo(2);
});