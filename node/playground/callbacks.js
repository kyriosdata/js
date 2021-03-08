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

const funcao = (resolve, reject) => {
  setTimeout(() => resolve("ok"), 2000);
};

const comPromise = new Promise(funcao);

comPromise.then(console.log);
