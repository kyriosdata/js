// Recupera a classe Matematica do módulo correspondente.
const Matematica = require('../matematica');

// Cria uma instância utilizada pelos testes
const matematica = new Matematica();

QUnit.test('soma trivial', function (assert) {

  // Executa a operação que desejamos testar
  let resultado = matematica.soma(3, -1);

  // Verifica se o resultado produzido é o esperado.
  assert.equal(resultado, 2, 'soma incorreta');
});

QUnit.test('subtração trivial', function(assert) {
    assert.equal(matematica.subtracao(100, 1), 99, '-1 deveria ser simples');
});
