const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    unique: true,
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

userSchema.methods.generateAccessToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "senha", {
    expiresIn: "30 minutes",
  });

  return token;
};

userSchema.statics.checkCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("nao foi possivel login...");
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw new Error("Falhou login...");
  }

  return user;
};

// middleware.
// Sempre que executado save em um usuário, função fornecida é executada.
// Assegura que apenas hash de password é persistida.
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
