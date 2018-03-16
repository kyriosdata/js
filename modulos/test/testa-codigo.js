// Importa a função soma (ES6)
import { soma } from "../codigo";

QUnit.test('soma trivial', function (assert) {

  // Executa a operação que desejamos testar
  let resultado = soma(3, -1);

  // Verifica se o resultado produzido é o esperado.
  assert.equal(resultado, 2, 'soma incorreta');
});
