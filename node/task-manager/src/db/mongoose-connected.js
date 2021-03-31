const mongoose = require("mongoose");
const { conexaoUrl } = require("./mongodb-vars");

async function conectaComMongoDB() {
  await mongoose.connect(conexaoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  const status = mongoose.connection.readyState === 1 ? "conectado" : "erro";
  console.log("Status de conexão com MongoDB:", status);
}

conectaComMongoDB();
