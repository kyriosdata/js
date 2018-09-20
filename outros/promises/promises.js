// Função cujo nome é suficiente para esclarecer o que faz
function oraFalsoOraVerdadeiro() {
  return Math.random() * 10 > 5;
}

function sucesso(ok) {
  console.log(ok);
}

function erro(erro) {
  console.log(erro);
}

// Argumento para o construtor da Promise
// Esta função será chamada imediatamente. 
function corpo(tudoBem, houveErro) {
	// Nada interessante é executado aqui. 
	// Em cenário real seria uma operação em arquivo
	// ou que recupera informação em um servidor, por exemplo.
	console.log("corpo do promise executando...");

	if (oraFalsoOraVerdadeiro()) {
		tudoBem("funcionou");
	} else {
		// Constrói objeto que representa erro
		// (mantém a pilha de execução)
		houveErro(Error("falhou"));
	}
}

let promise = new Promise(corpo);
promise.then(sucesso, erro);

