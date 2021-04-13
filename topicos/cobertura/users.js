// Gestão de usuários que participam de um chat

/**
 * @typedef Usuario
 * @type {object}
 * @property {string} id - Identificador do usuário. Valor fornecido por socket.io.
 * @property {string} username - Nome do usuário (nickname).
 * @property {string} room - Nome da sala.
 */

/**
 * Mantém usuários ativos em memória (não persistente)
 * @type {[Usuario]}
 */
const usuarios = [];

/**
 * Adiciona o usuário fornecido ao conjunto de usuários que estão interagindo via chat.
 *
 * @param {Usuario} usuario O usuário a ser acrescentado.
 * @returns O usuário fornecido como argumento ou o objeto contendo a propriedade erro para indicar que não foi possível a inserção.
 */
const adicionaUsuario = (usuario) => {
  if (!usuario || !usuario.id || !usuario.username || !usuario.room) {
    return {
      erro: "usuário inconsistente",
    };
  }

  const username = usuario.username.trim().toLowerCase();
  const room = usuario.room.trim().toLowerCase();

  if (!username || !room) {
    return { erro: "usuário e sala são necessários" };
  }

  const usuarioExiste = usuarios.find(
    (usr) => usr.username === username && usr.room === room
  );

  if (usuarioExiste) {
    return {
      erro: "username já está em uso",
    };
  }

  usuarios.push(usuario);
  return usuario;
};

/**
 * Recupera o usuário com o identificador fornecido ou undefined, se não existir usuário com tal identificador.
 * @param {string} id O identificador (socket.io) do usuário.
 * @returns O usuário que possui o identificador fornecido ou undefined, caso contrário.
 */
const obtemUsuario = (id) => {
  return usuarios.find((u) => u.id === id);
};

/**
 * Recupera todos os usuários que se registraram na sala indicada.
 * @param {string} sala Nome da sala.
 * @returns Os usuários que participam da sala. Ou vetor vazio, caso nenhum usuário participe da sala indicada.
 */
const presentesNaSala = (sala) => {
  return usuarios.filter((u) => u.room === sala);
};

/**
 * Remove o usuário cujo identificador é aquele fornecido.
 * @param {string} id O identificador do usuário a ser removido.
 * @returns O usuário removido ou undefined, caso contrário.
 */
const removeUsuario = (id) => {
  const indexToRemove = usuarios.findIndex((u) => u.id === id);
  if (indexToRemove < 0) {
    return undefined;
  }

  return usuarios.splice(indexToRemove, 1)[0];
};

module.exports = {
  adiciona: adicionaUsuario,
  obtem: obtemUsuario,
  presentes: presentesNaSala,
  remove: removeUsuario,
};
