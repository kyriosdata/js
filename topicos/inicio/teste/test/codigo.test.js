const operacao = require("../codigo");

test("1+1=2", () => {
  expect(operacao.soma(1,1)).toBe(2);
});