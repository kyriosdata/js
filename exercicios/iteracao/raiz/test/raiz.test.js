const raiz = require("../raiz");

test("raiz de quadrados",() => {
    expect(raiz(4, 0.001)).toBeCloseTo(2);
    expect(raiz(16, 0.001)).toBeCloseTo(4);
    expect(raiz(100, 0.001)).toBeCloseTo(10);
    expect(raiz(10000, 0.001)).toBeCloseTo(100);
});

test("raiz de números não inteiros", () => {
    expect(raiz(2, 0.001)).toBeCloseTo(1.414);
});