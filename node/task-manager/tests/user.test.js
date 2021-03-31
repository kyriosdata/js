const app = require("../src/app");
const request = require("supertest");
const User = require("../src/models/user");

const usuario = {
  password: "uma longa senha",
  email: process.env.EMAIL_SENDTO_TEST,
  name: "Pedro",
};

/**
 * Prepara o banco de dados para os testes.
 */
beforeEach(async () => {
  await User.deleteMany();
  await new User(usuario).save();
});

test("create", async () => {
  await request(app).post("/users").send(usuario).expect(500);
});

test("login usuario existente", async () => {
  await request(app).post("/users/login").send(usuario).expect(200);
});

test("login failusre", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "um que nao existe",
      password: "outra falha",
    })
    .expect(400);
});
