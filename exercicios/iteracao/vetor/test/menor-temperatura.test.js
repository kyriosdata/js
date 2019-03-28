
const ArgumentoInvalido = {};

function menorTemperatura(vetor) {
    if (!Array.isArray(vetor)) {
        throw new TypeError('Hello', "someFile.js", 10);
    }
}

test("excecao gerada se arg nao e vetor", () => {
    expect(() => menorTemperatura("a")).toThrow(TypeError);
    expect(() => menorTemperatura()).toThrow(TypeError);
    expect(() => menorTemperatura(1)).toThrow(TypeError);
    expect(() => menorTemperatura(null)).toThrow(TypeError);
});

// test("a única temperatura é a menor", () => {
//     expect(menorTemperatura([0])).toBe(0);
// });