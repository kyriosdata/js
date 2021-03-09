const mongoose = require("mongoose");
const { conexaoUrl } = require("./mongodb-utils");

mongoose.connect(conexaoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const collection = process.argv[2];

const CollectionModel = mongoose.model(collection, {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

CollectionModel.find((error, r) => {
  if (error) {
    console.log("Erro", error);
  } else {
    console.log(r);
    CollectionModel.countDocuments({}, (e, c) => {
      if (e) {
        console.log("Erro ao tentar contar documentos...", e);
      } else {
        console.log("Total de documentos:", c);
      }
      mongoose.disconnect();
    });
  }
});
