const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
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

// middleware.
// Sempre que executado save em um usuário, função fornecida é executada.
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
