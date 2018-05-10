const ok = console.log;
const falha = console.log;

// Função executada imediatamente
// pelo construtor da "promessa".
function executor(resolve, reject) {

  // faça algo aqui, possivelmente async e 
  // na sequência chame a função 'resolve' ou 'reject'.
  // Chame 'resolve' para indicar que o que foi feito 
  // ocorreu conforme esperado e, caso alguma falha
  // tenha ocorrido, chame 'reject'. 

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

// Outra função (executor). Conforme já comentado,
// o código dessa função é executado e, em consequência
// da execução, ou o método 'resolve' ou o 'reject' deve
// ser chamado com alguma informação a ser passada para
// a função 'then'.
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
