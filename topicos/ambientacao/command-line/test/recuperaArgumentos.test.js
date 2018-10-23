const argumentos = require("../recuperaArgumentos");

test("nao definido sem argumentos", () => {
    expect(() => { argumentos.recupera(); }).toThrow();
});

test("nao definido para menos de dois argumentos", () => {
    expect(() => { argumentos.recupera([]); }).toThrow();
    expect(() => { argumentos.recupera([ 1 ]); }).toThrow();
});

test("nao definido para mais de 2 argumentos", () => {
    expect(() => { argumentos.recupera([1,2,3]);}).toThrow();
});

test("recuperacao correta dos dois argumentos", () => {
    const recuperado = argumentos.recupera([ 1, 2 ]);

    expect(recuperado.length).toBe(2);
});

test("quando nao é process.argv apenas 2 argumentos", () => {

    expect(() => { argumentos.recupera([1, 2, 3, 4]); }).toThrow();
});

test("process.argv tratado diferentemente", () => {
    process.argv = [ 1, 2, 3, 4];

    const recuperado = argumentos.recupera(process.argv);

    expect(recuperado).toHaveLength(2);
    expect(recuperado[0]).toBe(3);
    expect(recuperado[1]).toBe(4);
});