const https = require('https');

function httpsGet(url) {
  const log = console.log;

  function parametro(funcao) {
    return function handler(resp) {
      let data = '';

      resp.on("data", chunk => data += chunk);
      resp.on("end", () => funcao(data));
    }
  }

  function executor(resolve, reject) {
    let ok = d => resolve(JSON.parse(d).now.epoch);
    let falha = e => reject("Houve um erro...");

    log("Qual meu IP? (acessando serviço remoto...)");
    https.get(url, parametro(ok)).on("error", falha);
  }

  return new Promise(executor);
}

const URL = "https://now.httpbin.org";
httpsGet(URL).then(console.log, console.log);
