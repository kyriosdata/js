
const ArgumentoInvalido = {};

function menorTemperatura(vetor) {
    if (!Array.isArray(vetor)) {
        throw new TypeError("array expected");
    }

    if (vetor.length === 0) {
        throw new RangeError("empty array");
    }

    return Math.min(...vetor);
}

test("excecao gerada se arg nao e vetor", () => {
    expect(() => menorTemperatura("a")).toThrow(TypeError);
    expect(() => menorTemperatura()).toThrow(TypeError);
    expect(() => menorTemperatura(1)).toThrow(TypeError);
    expect(() => menorTemperatura(null)).toThrow(TypeError);
    expect(() => menorTemperatura(undefined)).toThrow(TypeError);
    expect(() => menorTemperatura(undefined)).toThrow("array expected");
});

test("nenhum elemento no vetor gera exececao", () => {
    expect(() => menorTemperatura([])).toThrow(RangeError);
    expect(() => menorTemperatura([])).toThrow("empty array");
});

test("a única temperatura é a menor", () => {
    expect(menorTemperatura([0])).toBe(0);
});

test("casos clássicos", () => {
    expect(menorTemperatura([-1, -2])).toBe(-2);
    expect(menorTemperatura([0, -2])).toBe(-2);
    expect(menorTemperatura([0, 2])).toBe(0);
    expect(menorTemperatura([10, 52])).toBe(10);
    expect(menorTemperatura([2.34, 2.339])).toBe(2.339);
});