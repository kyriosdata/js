const mongoose = require("mongoose");
const validator = require("validator");
const { geraHash } = require("../middleware/seguranca");
const Task = require("./task");

const userSchema = mongoose.Schema(
  {
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
      unique: true,
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
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

// Cria atributo virtual para User para dar a
// impressão de que há um atributo em User que
// mantém todas as tarefas deste usuário.

// Estabelece a relação de N:1 de tarefa para usuário
// Desta forma, mongoose busca dados pertinentes com
// await req.user.populate("tasks").execPopulate();
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// A conversão de User para JSON
// ignora os campos 'password' e 'tokens'.
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  // Exclui o retorno de dois campos
  // (segurança)
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

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

// Antes de remover um usuário, remova
// todas as tarefas associadas ao usuário
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
