const app = require("../src/app");
const request = require("supertest");
const User = require("../src/models/user");

/**
 * Usário de referência para os testes.
 */
const usuario = {
  password: "uma longa senha",
  email: process.env.EMAIL_SENDTO_TEST,
  name: "Pedro",
};

/**
 * Prepara o banco de dados para os testes.
 */
beforeAll(async () => {
  await User.deleteMany();
  await new User(usuario).save();
});

test("create", async () => {
  await request(app).post("/users").send(usuario).expect(500);
});

/**
 * Token empregado em requisições posteriores
 */
let token;

test("login usuario existente", async () => {
  await request(app)
    .post("/users/login")
    .send(usuario)
    .expect((res) => {
      token = res.body.token;
    })
    .expect(200);
});

test("login failure", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "um que nao existe",
      password: "outra falha",
    })
    .expect(400);
});

test("profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", "Bearer " + token)
    .expect((res) => {
      expect(res.body.user.email).toBe(process.env.EMAIL_SENDTO_TEST);
    })
    .expect(200);
});
