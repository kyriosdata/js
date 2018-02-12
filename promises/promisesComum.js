let log = x => console.log(x);

new Promise(function corpo(tudoBem, houveErro) {
	log("corpo do promise executando...");

	if (Math.random() * 10 > 5) {
		tudoBem("funcionou");
	} else {
		houveErro(Error("falhou"));
	}
}).then(log, log);

