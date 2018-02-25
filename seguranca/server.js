const http = require('http');

const moment = require('moment');

moment.locale('pt-BR');

const instanteInicial = new Date();

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');

    const responseBody = { 
      inicio : moment(instanteInicial).format('LLLL'),
      desde : moment(instanteInicial).fromNow() };

    response.write(JSON.stringify(responseBody));
    response.end();
  });
}).listen(80);