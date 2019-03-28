import menorTemperatura from "../menor-temperatura";

test("apenas um argumento deve ser fornecido", () => {
    expect(() => menorTemperatura([0], "teste")).toThrow(TypeError);
    expect(() => menorTemperatura([0], "teste")).toThrow("um unico arg esperado");
});

test("excecao gerada se arg nao e vetor", () => {
    expect(() => menorTemperatura("a")).toThrow(TypeError);
    expect(() => menorTemperatura()).toThrow(TypeError);
    expect(() => menorTemperatura(1)).toThrow(TypeError);
    expect(() => menorTemperatura(null)).toThrow(TypeError);
    expect(() => menorTemperatura(undefined)).toThrow(TypeError);
    expect(() => menorTemperatura(undefined)).toThrow("vetor esperado");
});

test("nenhum elemento no vetor gera exececao", () => {
    expect(() => menorTemperatura([])).toThrow(RangeError);
    expect(() => menorTemperatura([])).toThrow("vetor vazio");
});

test("a única temperatura é a menor", () => {
    expect(menorTemperatura([0])).toBe(0);
});

test("casos clássicos", () => {
    expect(menorTemperatura([-1, -2])).toBe(-2);
    expect(menorTemperatura([-2, -2])).toBe(-2);
    expect(menorTemperatura([0, -2])).toBe(-2);
    expect(menorTemperatura([0, 2])).toBe(0);
    expect(menorTemperatura([10, 52])).toBe(10);
    expect(menorTemperatura([2.34, 2.339])).toBe(2.339);
});