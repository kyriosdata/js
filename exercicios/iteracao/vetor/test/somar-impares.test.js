const somarImpares = require("../somar-impares");

test("vetor vazio soma zero", () => {
    expect(somarImpares([])).toBe(0);
});

test("vetor sem valor ímpar soma zero", () => {
    expect(somarImpares([2])).toBe(0);
    expect(somarImpares([2, 4, 6])).toBe(0);
});

test("um único ímpar", () => {
    expect(somarImpares([1])).toBe(1);
    expect(somarImpares([3])).toBe(3);
    expect(somarImpares([101])).toBe(101);
});

test("vetor com ímpares e pares", () => {
    expect(somarImpares([1,  2])).toBe(1);
    expect(somarImpares([7, 1,  3])).toBe(11);
    expect(somarImpares([7,  7])).toBe(14);
});

