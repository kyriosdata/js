const app = require("../src/app");
const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../src/models/user");
const Task = require("../src/models/task");

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
 * Um único usuário sem tarefa associada.
 *
 * NÃO É PERIGOSO?
 * CRIAR UM BANCO INEXISTENTE SEMPRE?
 */
beforeAll(async () => {
  // Evita execução de testes em base que não segue o padrão
  // /test-<alguma coisa>-test
  // (supõe que uma base com tal nome só pode ser de teste)

  const url = mongoose.connection._connectionString;
  if (!url.match(/.*\/test-.*-test$/)) {
    process.exit(1);
  }

  await User.deleteMany();
  await Task.deleteMany();
});

test("cria usuário de referência", async () => {
  await request(app).post("/users").send(usuario).expect(201);
});

test("falha tentativa de criar o mesmo usuário", async () => {
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

test("adiciona 2 tarefas", async () => {
  await request(app)
    .post("/task")
    .send({ description: "tarefa inserida", completed: false })
    .set("Authorization", "Bearer " + token)
    .expect(201);

  await request(app)
    .post("/task")
    .send({ description: "tarefa inserida", completed: false })
    .set("Authorization", "Bearer " + token)
    .expect(201);

  await request(app)
    .get("/total/tasks")
    .expect((res) => expect(res.body.total).toBe(2));
});

test("remove usuário e suas tarefas", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", "Bearer " + token)
    .expect(200);

  await request(app)
    .get("/total/tasks")
    .expect((res) => expect(res.body.total).toBe(0));
});
