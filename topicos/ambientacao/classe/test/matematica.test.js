// Recupera a classe Matematica do módulo correspondente.
const Matematica = require("../matematica");

// Cria uma instância utilizada pelos testes
const matematica = new Matematica();

test("subtração trivial", () => {
  expect(matematica.subtracao(100, 1)).toBe(99);
});

test("soma trivial", () => {
  expect(matematica.soma(1, 2)).toBe(3);
});
