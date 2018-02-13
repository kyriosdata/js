const https = require('https');
const URL = "https://now.httpbin.org";
const log = console.log;

function parametro(funcao) {
  return function handler(resp) {
    let data = '';

    resp.on("data", chunk => data += chunk);
    resp.on("end", () => funcao(data));
  }
}

function corpo(resolve, reject) {
  let ok = d => resolve(JSON.parse(d).now.epoch);
  let falha = e => reject("Houve um erro...");
  
  log("Qual meu IP? (acessando serviço remoto...)");
  https.get(URL, parametro(ok)).on("error", falha);
}

function httpsGet() {
  return new Promise(corpo);
}

httpsGet().then(log, log);
