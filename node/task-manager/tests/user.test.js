const app = require("../src/app");
const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../src/models/user");

/**
 * Dois usuários são empregados nos testes
 */
const usuarioA = {
  password: "senhaUsuarioA",
  email: process.env.EMAIL_SENDTO_TEST,
  name: "Usuário A",
};

const usuarioB = {
  password: "senhaUsuarioB",
  email: "usuariob@gmail.com",
  name: "Usuário B",
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
  // log.disableAll();

  // Evita execução de testes em base que não segue o padrão
  // /test-<alguma coisa>-test
  // (supõe que uma base com tal nome só pode ser de teste)

  const url = mongoose.connection._connectionString;
  if (!url.match(/.*\/test-.*-test$/)) {
    process.exit(1);
  }

  await User.deleteMany({ name: usuarioA.name });
  await User.deleteOne({ name: usuarioB.name });
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("cria usuário de referência para testes", async () => {
  await request(app).post("/users").send(usuarioA).expect(201);
});

test("falha ao repetir criação do mesmo usuário", async () => {
  await request(app).post("/users").send(usuarioA).expect(400);
});

test("usuário não pode possuir nome nem email igual a outro", async () => {
  await request(app)
    .post("/users")
    .send({ ...usuarioA, email: "x@gmail.com" })
    .expect(400);
});

test("senha é obrigatória", async () => {
  await request(app)
    .post("/users")
    .send({ ...usuarioA, password: undefined })
    .expect(400);
});

test("cria usuário B", async () => {
  await request(app).post("/users").send(usuarioB).expect(201);
});

/**
 * Token empregado em requisições posteriores.
 * Assume que os testes neste arquivo são executados na
 * ordem que seguem.
 */
let token;

test("login usuario A", async () => {
  const response = await request(app)
    .post("/users/login")
    .send(usuarioA)
    .expect((res) => {
      token = res.body.token;
    })
    .expect(200);

  expect(response.body.user.name).toBe(usuarioA.name);
  expect(token).not.toBeNull();
  expect(token.length).not.toBe(0);
  expect(response.body.user.password).not.toBe(usuarioA.password);
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

  const user = await User.findOne({ email: usuarioA.email });
  expect(user.avatar).toEqual(expect.any(Buffer));
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

test("profile exige autenticação", async () => {
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

test("apenas email e password podem ser alteradas", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", "Bearer " + token)
    .send({
      name: "Pedro Álvares Cabral",
    })
    .expect(400);
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

test("altera email do usuário B", async () => {
  let novoToken;
  const NOVO_EMAIL = "novousuariob@gmail.com";

  await request(app)
    .post("/users/login")
    .send(usuarioB)
    .expect((res) => (novoToken = res.body.token))
    .expect(200);

  await request(app)
    .patch("/users/me")
    .set("Authorization", "Bearer " + novoToken)
    .send({ email: NOVO_EMAIL })
    .expect(200);

  const resposta = await request(app)
    .get("/users/me")
    .set("Authorization", "Bearer " + novoToken)
    .send()
    .expect(200);

  expect(resposta.body.user.email).toEqual(NOVO_EMAIL);

  await request(app)
    .delete("/users/me")
    .set("Authorization", "Bearer " + novoToken)
    .send()
    .expect(200);
});
