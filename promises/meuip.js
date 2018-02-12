const https = require('https');
 
function resposta(resp) {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
   console.log(JSON.parse(data).origin);
  });
}

https.get('https://httpbin.org/ip', resposta).on("error", (err) => {
  console.log("Error: " + err.message);
});
