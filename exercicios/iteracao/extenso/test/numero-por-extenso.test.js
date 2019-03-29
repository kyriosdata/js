const numeroPorExtenso = require("../numero-por-extenso");

test("argumento inválido", () => {
    expect(() => numeroPorExtenso("a")).toThrow(TypeError);
    expect(() => numeroPorExtenso(true)).toThrow(TypeError);
    expect(() => numeroPorExtenso()).toThrow(TypeError);
    expect(() => numeroPorExtenso([])).toThrow(TypeError);
    expect(() => numeroPorExtenso(null)).toThrow(TypeError);
    expect(() => numeroPorExtenso(undefined)).toThrow(TypeError);
    expect(() => numeroPorExtenso(undefined)).toThrow(TypeError);
});

test("numero fora da faixa", () => {
    expect(numeroPorExtenso(-1)).toThrow(RangeError);
    expect(numeroPorExtenso(1000)).toThrow(RangeError);
});

test("unidade", () => {
    expect(numeroPorExtenso(0)).toBe("zero");
    expect(numeroPorExtenso(7)).toBe("sete");
});

test("dezenas", () => {
    expect(numeroPorExtenso(10)).toBe("dez");
    expect(numeroPorExtenso(17)).toBe("dezessete");
    expect(numeroPorExtenso(29)).toBe("vinte e nove");
    expect(numeroPorExtenso(33)).toBe("trinta e três");
    expect(numeroPorExtenso(40)).toBe("quarenta");
});

test("centenas", () => {
    expect(numeroPorExtenso(101)).toBe("cento e um");
    expect(numeroPorExtenso(567)).toBe("quinhentos e sessenta e sete");
    expect(numeroPorExtenso(999)).toBe("novecentos e noventa e nove");
});

