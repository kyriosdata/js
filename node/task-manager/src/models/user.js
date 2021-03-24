const mongoose = require("mongoose");
const validator = require("validator");
const { geraToken, geraHash } = require("../middleware/auth");

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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// userSchema.methods.generateAccessToken = async function () {
//   const user = this;
//   const token = geraToken(user._id.toString());

//   user.tokens = user.tokens.concat({ token });
//   await user.save();

//   return token;
// };

// userSchema.statics.checkCredentials = async (email, password) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new Error("nao foi possivel login...");
//   }

//   await senhaVerificadaComHash(password, user.password);

//   return user;
// };

// Mongoose Middleware
// Sempre que executado save em um usuário, função fornecida é executada.
// Assegura que apenas hash de password é persistida.
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await geraHash(user.password);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
