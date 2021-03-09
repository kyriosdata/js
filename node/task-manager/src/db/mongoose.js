const mongoose = require("mongoose");
const { conexaoUrl } = require("./mongodb-utils");

mongoose.connect(conexaoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
