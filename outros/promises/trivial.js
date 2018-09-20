let promise = new Promise(function(resolve, reject) {

  // Evidência de que função é chamada imediatamente
  console.log("Função para construtor chamada!");

  // Indica sucesso e o valor resultante: 1
  // Em caso real, antes dessa chamada, teríamos 
  // código que produz um valor, possivelmente após "longa"
  // operação.
  resolve(1);
});


promise.then(function(valor) {
  console.log(valor);
  return valor + 2;
}).then(function(valor) {
  console.log(valor);
});
