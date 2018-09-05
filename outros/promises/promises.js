function oraFalsoOraVerdadeiro() {
  return Math.random() * 10 > 5;
}

function sucesso(ok) {
  console.log(ok);
}

function erro(erro) {
  console.log(erro);
}

function corpo(tudoBem, houveErro) {
	console.log("corpo do promise executando...");

	if (oraFalsoOraVerdadeiro()) {
		tudoBem("funcionou");
	} else {
		houveErro(Error("falhou"));
	}
}

let promise = new Promise(corpo);
promise.then(sucesso, erro);

