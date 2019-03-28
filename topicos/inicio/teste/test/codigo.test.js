// No final do arquivo codigo.js encontra-se
// exports.soma = soma;
// 
// Conforme comentado no próprio arquivo codigo.js,
// module.exports é a referência para o objeto retornado
// por chamadas require(). Ou seja, abaixo, o que é
// "operacao" será o mesmo que "exports", ou seja,
// "operacao.soma" é a função "soma" definida no
// arquivo codigo.js.

const operacao = require("../codigo");

test("1+1=2", () => {
  expect(operacao.soma(1,1)).toBe(2);
});