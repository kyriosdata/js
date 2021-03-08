const { MongoClient } = require("mongodb");
const { conexaoUrl, database } = require("./mongodb-utils");

MongoClient.connect(conexaoUrl, {}, (error, client) => {
  if (error) {
    console.log("Não foi possível conexão...");
  } else {
    console.log("Conexão estabelecida.");
  }

  const db = client.db(database);
  const collection = db.collection("tasks");
  const incrementePor = (valor) => ({ $inc: { k: valor } });

  collection
    .updateMany({}, incrementePor(4))
    .then(console.log)
    .then(client.close());
});
