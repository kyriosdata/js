const obj = require("../definicao");
const igualdade = require("../igualdade");

test("sapato número 42", () => {
    expect(obj.sapato.numero).toBe(42);
});

test("o1 e o2 são definidos como objetos iguais", () => {
    expect(igualdade.iguais(igualdade.o1, igualdade.o2)).toBe(true);
});

test("Por que o1 é diferente de o2?", () => {
    expect(igualdade.o1 == igualdade.o2).toBe(false);
});

test("Novamente, por que o1 é diferente de o2?", () => {
    expect(igualdade.o1 === igualdade.o2).toBe(false);
});

