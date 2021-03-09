const mongoose = require("mongoose");
const { conexaoUrl } = require("./mongodb-utils");

mongoose.connect(conexaoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const me = new User({ description: "Fábio", completed: true });

me.save().then(console.log).catch(console.log);
