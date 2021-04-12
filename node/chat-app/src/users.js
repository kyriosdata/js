// Gestão de usuários

// Mantém usuários ativos (conexões) em memória não persistente
const usuarios = [];

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

const obtemUsuario = (id) => {
  return usuarios.find((u) => u.id === id);
};

const presentesNaSala = (sala) => {
  return usuarios.filter((u) => u.room === sala);
};

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
