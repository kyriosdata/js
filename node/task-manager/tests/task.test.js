const app = require("../src/app");
const request = require("supertest");
const mongoose = require("mongoose");

/**
 * Usuário empregado nos testes.
 */
const usuario = {
  password: "usuarioParaTeste",
  email: "usuarioparateste@gmail.com",
  name: "Usuário Para Teste",
};

/**
 * Prepara o banco de dados para os testes.
 * (remove eventual instância do objeto 'usuario')
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

  const response = await request(app).post("/users/login").send(usuario);

  if (response.body) {
    const userToken = response.body.token;
    // await request(app)
    //   .delete("/users/me")
    //   .set("Authorization", "Bearer " + userToken)
    //   .send()
    //   .expect(200);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("cria usuário para testes", async () => {
  await request(app).post("/users").send(usuario).expect(201);
});

/**
 * Token empregado em requisições posteriores.
 * Assume que os testes neste arquivo são executados na
 * ordem que seguem.
 */
let token;

test("login usuario para teste", async () => {
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

test("usuário não possui nenhuma tarefa atribuída", async () => {
  const response = await request(app)
    .get("/users/me")
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(200);

  expect(response.body.tasks.length).toBe(0);
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

test("remove uma tarefa", async () => {
  const response = await request(app)
    .get("/users/me")
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(200);

  expect(response.body.tasks.length).toBe(2);

  // Remove uma tarefa
  const taskId = response.body.tasks[0]._id;
  await request(app)
    .delete("/tasks/" + taskId)
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(200);

  const segundaConsulta = await request(app)
    .get("/users/me")
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(200);

  expect(segundaConsulta.body.tasks.length).toBe(1);
});

test("remover usuário remove tarefas", async () => {
  const consulta = await request(app)
    .get("/users/me")
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(200);

  expect(consulta.body.tasks.length).toBe(1);
  const taskId = consulta.body.tasks[0]._id;

  await request(app)
    .delete("/users/me")
    .set("Authorization", "Bearer " + token)
    .expect(200);

  await request(app)
    .get("/tasks/" + taskId)
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(404);

  await request(app)
    .get("/users/me")
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(401);
});
