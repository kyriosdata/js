const https = require('https');

function httpsGet(url) {

  function executor(resolve, reject) {

    function handler(resp) {
      let data = '';

      resp.on("data", chunk => data += chunk);
      resp.on("end", () => resolve(data));
    }

    let falha = e => reject(e);

    https.get(url, handler).on("error", falha);
  }

  return new Promise(executor);
}

// Vamos obter a hora corrente?
// Em geral isso é feito em poucas linhas de código
// em JavaScript. Abaixo segue uma versão "longa"
// que facilita a compreensão do que está ocorrendo.

// Algoritmo
// 1. Requisitar a hora corrente
// 2. Realizar o parsing dos dados
// 3. Extrair a informação relevante
// 4. Montar uma data correspondente
// 5. Exibir a data.

function horaCorrente(url) {
  return httpsGet(url);
}

function parsing(dados) {
  return JSON.parse(dados);
}

function extrair(dados) {
  return dados.now.epoch;
}

function montarData(epoca) {
  var utcSeconds = epoca;
  var data = new Date(0);
  data.setUTCSeconds(utcSeconds);
  
  return data;
}

function exibir(data) {
  console.log(data);
}

const URL = "https://now.httpbin.org";
horaCorrente(URL)
  .then(parsing, console.log)
  .then(extrair, console.log)
  .then(montarData, console.log)
  .then(exibir, console.log);
