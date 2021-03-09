const mongoose = require("mongoose");
const validator = require("validator");

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
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = User;
