const add = (x, y, c) => setTimeout(() => c(x + y), 2000);

// add(1, 4, console.log);

function algumaOperacaoAssincrona(f) {
  setTimeout(() => f(undefined, "funcionou"), 2000);
}

function callbackToExecutAtTheEnd(error, result) {
  if (error) {
    console.log("erro:", error);
  } else {
    console.log("ok", result);
  }
}

algumaOperacaoAssincrona(callbackToExecutAtTheEnd);

// Agora usando Promise

// Função que executa operação assíncrona (recebe 2 funções como parâmetros)
// (se tudo ok, chame a primeira, resolve, com o retorno)
// (se houve erro, chame a segunda, reject, com o retorno)
const funcao = (resolve, reject) => {
  reject("reject");
};

const comPromise = new Promise(funcao);

comPromise.then(console.log).catch(console.log);
