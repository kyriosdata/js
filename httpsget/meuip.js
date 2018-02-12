const https = require('https');
const log = x => console.log(x);
const URL = "https://httpbin.org/ip";

function handler(resp) {
  let data = '';
 
  resp.on("data", chunk => data += chunk); 
  resp.on("end", () => log(JSON.parse(data).origin));
}

const erro = err => log(err);

https.get(URL, handler).on("error", erro);