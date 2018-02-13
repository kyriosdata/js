const log = console.log;
const ok = log;
const falha = log;

// Função executada imediatamente
// pelo construtor da "promessa".
function executor(resolve, reject) {

  // faça algo aqui, possivelmente async e 
  // na sequência chame 'resolve' ou 'reject'
  // conforme o resultado do que foi feito. 

  // Vamos supor que tudo correu bem...
  if (true) {
    // então chame 'resolve' (primeiro parâmetro)
    resolve("funcionou");
  } else {
    // então chame 'reject' (segundo parâmetro)
    reject("falhou");
  }
}

// Crie instância da promessa, função
// 'executor' é executada imediatamente.
let promessa = new Promise(executor);

// Após conclusão do 'executor', ou a função 'ok'
// ou 'falha' será chamada. Qual delas?
// Será 'ok' se 'resolve' foi chamada pelo 'executor'. 
// Será 'falha' caso contrário.
// E quanto ao parâmetro para 'ok' e 'falha'?
// Será aquele fornecido para 'resolve' ou 'reject'. 
promessa.then(ok, falha);

function outroExecutor(resolve, reject) {

  // Vamos supor que, dessa vez, houve um erro...
  if (false) {
    resolve("funcionou");
  } else {
    reject("falhou");
  }
}

// Produzirá como resultado "falhou", pois a função
// 'reject' é chamada e o argumento a ser fornecido
// para a função 'falha' será "falhou".
new Promise(outroExecutor).then(ok, falha);