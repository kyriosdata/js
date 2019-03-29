const raiz = require("../raiz");

test("casos simples",() => {
    expect(raiz(4, 0.001)).toBeCloseTo(2);
    expect(raiz(16, 0.001)).toBeCloseTo(4);
    expect(raiz(100, 0.001)).toBeCloseTo(10);
});