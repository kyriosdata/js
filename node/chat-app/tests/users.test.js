const Usuario = require("../src/users");

test("usuario nao definido", () => {
  expect(Usuario.adiciona(null).erro).not.toBeUndefined();
  expect(Usuario.adiciona(undefined).erro).not.toBeUndefined();
  expect(Usuario.adiciona().erro).not.toBeUndefined();
});

test("erro se não fornecido username", () => {
  const usuario = { id: "1", room: "r" };
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

test("usuário inserido é encontrado", () => {
  const usuario = { id: "i", username: "n123", room: "r" };
  const adicionado = Usuario.adiciona(usuario);
  const encontrado = Usuario.obtem("n123");
  expect(encontrado).toEqual(adicionado);
});
