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
})