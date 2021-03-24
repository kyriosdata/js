const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * Função 'middleware' que é executada com a finalidade de autenticação.
 * Precisa ser fornecida como segundo parâmetro para cada router
 * que depender de autenticação.
 *
 * Adicionalmente, router configurado só será chamado se método
 * 'next' for chamado.
 *
 * @param {object} req Requisição conforme recebida pelo Express
 * @param {object} res Resposta conforme disponibilizada pelo Epress
 * @param {function} next Função a ser chamada para encaminhar para router
 */
const auth = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    const token = header.substring(7);
    // checar aqui
    next();
  } catch (error) {
    res.status(401).send({ error: "Exige autenticação..." });
  }
};

module.exports = auth;
