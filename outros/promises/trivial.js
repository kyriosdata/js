let promise = new Promise(function(resolve, reject) {
  // Indica sucesso e o valor resultante: 1
  // Em caso real, antes dessa chamada, primeiro
  // código que produz um valor seria executado.
  resolve(1);
});


promise.then(function(valor) {
  console.log(valor);
  return valor + 2;
}).then(function(valor) {
  console.log(valor);
});