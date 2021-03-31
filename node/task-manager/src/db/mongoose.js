const mongoose = require("mongoose");
const { conexaoUrl } = require("./mongodb-utils");

async function conectaComMongoDB() {
  const conexao = await mongoose.connect(conexaoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  const status = conexao.connection.readyState === 1 ? "conectado" : "erro";
  console.log("Status de conexão com MongoDB:", status);
}

conectaComMongoDB();

module.exports = mongoose;
