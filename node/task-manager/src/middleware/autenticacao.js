const User = require("../models/user");
const Auth = require("./seguranca");
const log = require("loglevel");

/**
 * Função 'middleware' que é executada com a finalidade de autenticação.
 * Precisa ser fornecida como segundo parâmetro para cada router
 * que depender de autenticação.
 *
 * Adicionalmente, router configurado só será chamado se método
 * 'next' for chamado e, por fim, se autenticação for realizada com
 * sucesso, então a requisição será acrescida do campo 'user' com
 * o perfil do usuário em questão.
 *
 * IMPORTANTE. Esta função usa a base de dados para verificar se token
 * fornecido está válido, ou seja, não ocorreu logout.
 *
 * @param {object} req Requisição conforme recebida pelo Express
 * @param {object} res Resposta conforme disponibilizada pelo Epress
 * @param {function} next Função a ser chamada para encaminhar para router
 */
const auth = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    const token = Auth.extractTokenFromHeader(header);
    const decoded = Auth.decodeToken(token);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("usuario/token nao encontrado");
    }

    // Mantém usuário e token
    // (possivelmente empregados em outras operações)
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    log.warn(error.message);
    res.status(401).send({ error: "Exige autenticação..." });
  }
};

module.exports = auth;
