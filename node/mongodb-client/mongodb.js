const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// Informações necessárias fornecidas via variáveis de ambiente
const mongodbUser = process.env.MONGODB_USER;
const mongodbPass = process.env.MONGODB_PASS;
const server = process.env.MONGODB_SERVER;
const port = process.env.MONGODB_PORT;
const database = process.env.MONGODB_DBNAME;

const credencial = `${mongodbUser}:${mongodbPass}`;
const conexaoUrl = `mongodb://${credencial}@${server}:${port}/${database}`;

MongoClient.connect(conexaoUrl, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Erro ao conectar com banco de dados");
  }

  console.log("Conexão realizada satisfatoriamente");
});
