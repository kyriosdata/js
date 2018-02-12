const https = require('https');
const log = x => console.log(x);
const URL = "https://httpbin.org/ip";
const erro = err => log(err);
const ip = dados => log(JSON.parse(dados).origin);

function handler(resp, faz) {
  let data = '';
 
  resp.on("data", chunk => data += chunk); 
  resp.on("end", () => ip(data));
}

https.get(URL, handler).on("error", erro);
log("vou aguardar pelo retorno...");

function get(url) {
  return new Promise(function(resolve, reject) { 
  });
}