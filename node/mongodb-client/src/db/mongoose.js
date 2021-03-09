const mongoose = require("mongoose");
const validator = require("validator");
const { conexaoUrl } = require("./mongodb-utils");

mongoose.connect(conexaoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(valor) {
      if (valor.toLowerCase().includes("password")) {
        throw new Error("Invalid term in password");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(valor) {
      if (!validator.isEmail(valor)) {
        throw new Error("Email is invalid");
      }
    },
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  age: {
    type: Number,
    required: true,
    validate(valor) {
      if (valor < 0 || valor > 200) {
        throw new Error("idade invalida " + valor);
      }
    },
  },
});

const me = new User({
  description: "Fábio",
  email: " TESTE@ufg.BR ",
  age: 22,
  password: "  apas232323   ",
});

me.save().then(console.log).catch(console.log);
