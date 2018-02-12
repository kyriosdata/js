let promise = new Promise(function(resolve, reject) {
  // Operação falha
  reject("um mensagem explicativa...");
});

function ok(valor) {
  console.log(valor);
  return valor + 2;
}

function falha(valor) {
  console.log("ERRO: " + valor);
}

// Forneça uma função para sucesso e outra para falha.
// Se a operação é executada satisfatoriamente e a
// função 'resolve' é chamada, então 'ok' é chamada.
// Se a operação falha, a função 'reject' é chamada
// e, em consequência, a função 'falha' é chamada.
promise.then(ok, falha);