const contarOcorrencias = require("../contar-ocorrencias");

test("nenhum elemento no vetor", () => {
    expect(contarOcorrencias([], 10)).toBe(0);
});

test("argumentos invalidos", () => {
    expect(() => contarOcorrencias("a")).toThrow(TypeError);
    expect(() => contarOcorrencias()).toThrow(TypeError);
    expect(() => contarOcorrencias(1)).toThrow(TypeError);
    expect(() => contarOcorrencias(null)).toThrow(TypeError);
    expect(() => contarOcorrencias(undefined)).toThrow(TypeError);
    expect(() => contarOcorrencias(undefined)).toThrow("vetor esperado");
});