const app = require("../src/app");
const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../src/models/user");
const Task = require("../src/models/task");
const log = require("loglevel");

/**
 * Usário de referência para os testes.
 */
const usuario = {
  password: "uma longa senha",
  email: process.env.EMAIL_SENDTO_TEST,
  name: "Prefixo Pedro Sufixo Júnior",
};

/**
 * Prepara o banco de dados para os testes.
 * Um único usuário sem tarefa associada.
 *
 * NÃO É PERIGOSO?
 * (não seria indicado criar um banco sempre?)
 * (estratégia abaixo exige test-<nome>-test por segurança)
 */
beforeAll(async () => {
  // disable all logs
  log.disableAll();

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

afterAll(async () => {
  await mongoose.connection.close();
});

test("cria usuário de referência", async () => {
  await request(app).post("/users").send(usuario).expect(201);
});

test("falha email já empregado", async () => {
  await request(app).post("/users").send(usuario).expect(500);
});

test("falha nome não é único", async () => {
  await request(app)
    .post("/users")
    .send({ ...usuario, email: "x@gmail.com" })
    .expect(500);
});

/**
 * Token empregado em requisições posteriores.
 * Assume que os testes neste arquivo são executados na
 * ordem que seguem.
 */
let token;

test("login usuario existente", async () => {
  const response = await request(app)
    .post("/users/login")
    .send(usuario)
    .expect((res) => {
      token = res.body.token;
    })
    .expect(200);

  expect(response.body.user.name).toBe(usuario.name);
  expect(token).not.toBeNull();
  expect(token.length).not.toBe(0);
  expect(response.body.user.password).not.toBe(usuario.password);
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

test("upload avatar", async () => {
  // FIELD_AVATAR = "avatar"
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", "Bearer " + token)
    .attach("avatar", "tests/fixtures/kyriosdata.jpg")
    .expect(200);
});

test("profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", "Bearer " + token)
    .send()
    .expect((res) => {
      expect(res.body.user.email).toBe(process.env.EMAIL_SENDTO_TEST);
    })
    .expect(200);
});

test("profile sem autenticação falha", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", "Bearer asdf21adfasdf")
    .send()
    .expect(401);
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

  await request(app)
    .get("/users/me")
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(401);
});
