const Usuario = require("../users");

test("usuario nao definido", () => {
  expect(Usuario.adiciona(null).erro).not.toBeUndefined();
  expect(Usuario.adiciona(undefined).erro).not.toBeUndefined();
  expect(Usuario.adiciona().erro).not.toBeUndefined();
});

test("erro se não fornecido username", () => {
  const usuario = { id: "1", room: "r" };
  expect(Usuario.adiciona(usuario).erro).not.toBeUndefined();
});

test("username em branco não é válido", () => {
  const usuario = { id: "1", username: "  ", room: "r" };
  expect(Usuario.adiciona(usuario).erro).not.toBeUndefined();
});

test("room em branco não é válido", () => {
  const usuario = { id: "1", username: "não vazio", room: " " };
  expect(Usuario.adiciona(usuario).erro).not.toBeUndefined();
});

test("erro se não fornecido id", () => {
  const usuario = { username: "username", room: "r" };
  const retorno = Usuario.adiciona(usuario);
  expect(retorno.erro).not.toBeUndefined();
});

test("erro se não fornecido room", () => {
  const usuario = { id: "i", username: "username" };
  const retorno = Usuario.adiciona(usuario);
  expect(retorno.erro).not.toBeUndefined();
});

test("usuário acrescentado", () => {
  const usuario = { id: "i", username: "u", room: "r" };
  const retorno = Usuario.adiciona(usuario);
  expect(retorno).not.toBeNull();
  expect(retorno).not.toBeUndefined();
});

test("usuário único por sala", () => {
  const usuario = { id: "único", username: "único", room: "sala" };
  const retorno = Usuario.adiciona(usuario);
  expect(retorno).not.toBeNull();
  expect(retorno).not.toBeUndefined();
});

test("usuário inserido é encontrado", () => {
  const usuario = { id: "i123", username: "n123", room: "r" };
  const adicionado = Usuario.adiciona(usuario);
  const encontrado = Usuario.obtem("i123");
  expect(encontrado).toEqual(adicionado);
});

test("não há como recuperar usuário null", () => {
  const recuperado = Usuario.obtem(null);
  expect(recuperado).toBeUndefined();
});

test("ninguém presente em sala vazia", () => {
  const presentes = Usuario.presentes("uma sala inexistente");
  expect(presentes.length).toBe(0);
});

test("não há como remover usuário não inserido", () => {
  const retorno = Usuario.remove("o que não foi inserido");
  expect(retorno).toBeUndefined();
});

test("remove usuário inserido", () => {
  const usuario = { id: "um id", username: "um username", room: "r" };
  Usuario.adiciona(usuario);

  const removido = Usuario.remove("um id");
  expect(removido).toEqual(usuario);
});
