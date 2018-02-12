const https = require('https');
const URL = "https://httpbin.org/ip";
const log = console.log;

function parametro(funcao) {
  return function handler(resp) {
    let data = '';

    resp.on("data", chunk => data += chunk);
    resp.on("end", () => funcao(data));
  }
}

function corpo(resolve, reject) {
  let ok = d => resolve(JSON.parse(d).origin);
  let falha = e => reject("Houve um erro...");
  
  log("Qual meu IP? (acessando serviço remoto...)");
  https.get(URL, parametro(ok)).on("error", falha);
}

new Promise(corpo).then(log, log);
