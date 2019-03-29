const contarOcorrencias = require("../contar-ocorrencias");

test("nenhum elemento no vetor", () => {
    expect(contarOcorrencias([], 10)).toBe(0);
});

test("argumentos invalidos", () => {
    expect(() => contarOcorrencias("a", 5)).toThrow(TypeError);
    expect(() => contarOcorrencias([], "a")).toThrow(TypeError);
    expect(() => contarOcorrencias([])).toThrow(TypeError);
    expect(() => contarOcorrencias()).toThrow(TypeError);
    expect(() => contarOcorrencias(1)).toThrow(TypeError);
    expect(() => contarOcorrencias(null, 1)).toThrow(TypeError);
    expect(() => contarOcorrencias([], null)).toThrow(TypeError);
    expect(() => contarOcorrencias(undefined, 3)).toThrow(TypeError);
    expect(() => contarOcorrencias([], undefined)).toThrow(TypeError);
});

test("apenas valores numericos", () => {
    expect(() => contarOcorrencias([1, "a"], 1)).toThrow(TypeError);
});

test("nenhum elemento retorno 0", () => {
    expect(contarOcorrencias([], 1)).toBe(0);
});

test("nenhuma ocorrência", () => {
    expect(contarOcorrencias([2, 3, 4], 1)).toBe(0);
    expect(contarOcorrencias([2, 3, 4], 5)).toBe(0);
});

test("um elemento uma ocorrência", () => {
    expect(contarOcorrencias([2], 2)).toBe(1);
    expect(contarOcorrencias([3], 3)).toBe(1);
});

test("varias ocorrências", () => {
    expect(contarOcorrencias([1,2,3,1, 1, 1], 1)).toBe(4);
});