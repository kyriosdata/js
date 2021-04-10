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

const removeUsuario = (id) => {};

const obtemUsuario = (username) => {
  return usuarios.find((u) => u.username === username);
};

module.exports = {
  adiciona: adicionaUsuario,
  obtem: obtemUsuario,
};
