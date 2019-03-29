const somarImpares = require("../somar-impares");

test("vetor vazio soma zero", () => {
    expect(somarImpares([])).toBe(0);
});