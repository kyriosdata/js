
const ArgumentoInvalido = {};

function menorTemperatura(vetor) {
    throw new TypeError("argumento não é vetor");
}

test("se arg não é vetor então exception", () => {
    expect(menorTemperatura("a")).toThrowError("argumento");
});

// test("a única temperatura é a menor", () => {
//     expect(menorTemperatura([0])).toBe(0);
// });