const mongoose = require("mongoose");
const { conexaoUrl } = require("./mongodb-utils");

mongoose.connect(conexaoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const me = new User({ name: "Fábio", age: 53 });

me.save().then(console.log).catch(console.log);
