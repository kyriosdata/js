const { MongoClient, ObjectID } = require("mongodb");

// Informações necessárias fornecidas via variáveis de ambiente
const mongodbUser = process.env.MONGODB_USER;
const mongodbPass = process.env.MONGODB_PASS;
const server = process.env.MONGODB_SERVER;
const port = process.env.MONGODB_PORT;
const database = process.env.MONGODB_DBNAME;

const credencial = `${mongodbUser}:${mongodbPass}`;
const conexaoUrl = `mongodb://${credencial}@${server}:${port}/${database}`;

MongoClient.connect(conexaoUrl, {}, (error, client) => {
  if (error) {
    console.log("Não foi possível conexão...");
  } else {
    console.log("Conexão estabelecida.");
  }

  const db = client.db(database);
  const collection = db.collection("tasks");

  collection.findOne({ x: undefined }, (e, r) => {
    console.log(r);
  });

  client.close();
});
