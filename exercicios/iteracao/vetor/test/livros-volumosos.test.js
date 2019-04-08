const livrosVolumosos = require("../livros-volumosos");

test("apenas um argumento deve ser fornecido", () => {
    expect(() => livrosVolumosos([0], "teste")).toThrow(TypeError);
    expect(() => livrosVolumosos([0], 1)).toThrow(TypeError);
});

test("argumento inválido", () => {
    expect(() => livrosVolumosos("a")).toThrow(TypeError);
    expect(() => livrosVolumosos()).toThrow(TypeError);
    expect(() => livrosVolumosos(1)).toThrow(TypeError);
    expect(() => livrosVolumosos(null)).toThrow(TypeError);
    expect(() => livrosVolumosos(undefined)).toThrow(TypeError);
    expect(() => livrosVolumosos(undefined)).toThrow();
});

test("nenhum elemento no vetor", () => {
    expect(livrosVolumosos([])).toEqual([]);
});

test("livro sem atributo numeroPaginas é ignorado", () => {
    expect(livrosVolumosos([ { "nPaginas" : 10 } ])).toEqual([]);
});

test("livro com valor não numérico para numeroPaginas é ignorado", () => {
    expect(livrosVolumosos([ { numeroPaginas : "10" } ])).toEqual([]);
});

test("casos clássicos", () => {
    const l1 = { numeroPaginas : 1 };
    const l2 = { numeroPaginas : 10 };
    const l3 = { numeroPaginas : 91 };
    const l4 = { numeroPaginas : 105 };

    expect(livrosVolumosos([ l1 ])).toEqual([ l1 ]);
    expect(livrosVolumosos([ l1, l2 ])).toEqual([ l2 ]);
    expect(livrosVolumosos([ l1, l2, l3 ])).toEqual([ l3 ]);
    expect(livrosVolumosos([ l1, l2, l3, l4 ])).toEqual([ l4 ]);
});