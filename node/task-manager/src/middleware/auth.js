/**
 * Módulo que reúne todas as funções pertinentes à autenticação.
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Chave secreta a ser utilizada para geração de token.
 * Esta chave deve ser gerada ou obtida de alguma forma
 * sem que seja conhecida, ao contrário do valor fixo
 * fornecido abaixo.
 */
const SEGREDO = "senha";

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
// const auth = async (req, res, next) => {
//   try {
//     const header = req.header("Authorization");
//     const token = extractTokenFromHeader(header);
//     const decoded = jwt.verify(token, SEGREDO);

//     const user = await User.findOne({
//       _id: decoded._id,
//       "tokens.token": token,
//     });
//     if (!user) {
//       throw new Error();
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     res.status(401).send({ error: "Exige autenticação..." });
//   }
// };

/**
 * Gera o 'token' pertinente ao objeto que contém um atributo, _id,
 * cujo valor é o payload fornecido.
 *
 * @param {string} payload Identificador único do usuário.
 * @returns O token conforme JWT.
 */
const codeToken = (payload) => {
  return jwt.sign({ _id: payload }, SEGREDO, { expiresIn: "30 minutes" });
};

/**
 * Decodifica o token fornecido.
 *
 * @param {string} token Token a ser decodificado. Este token deve ter
 * sido gerado com a função 'codeToken'.
 * @returns Token decodificado.
 */
const decodeToken = (token) => jwt.verify(token, SEGREDO);

/**
 * Extrai do valor do header, o valor do token que deve ser precidido de
 * 'Bearer '.
 *
 * @param {string} header Valor do header 'Authorization'. Este valor inclui
 * o token após o prefixo 'Bearer ' (observe o espaço em branco).
 *
 * @returns Apenas o valor do token.
 */
const extractTokenFromHeader = (header) => header.substring(7);

/**
 * Produz valor de hash empregado para armazenamento correspondente a uma senha.
 * Desta forma, a senha propriamente dita não precisa ser armazenada, mas o
 * valor de hash corresondente.
 *
 * @param {string} password A senha para a qual o valor de hash correspondente
 * será computado.
 *
 * @returns Valor de hash (seguro) para armazenar uma senha.
 */
const geraHash = async (password) => await bcrypt.hash(password, 12);

/**
 * Verifica se a senha fornecida é compatível com o valor de hash.
 *
 * @param {string} senha Senha (plain text)
 * @param {string} hash Valor de hash esperado para a senha.
 */
const verificaHash = async (senha, hash) => {
  const ok = await bcrypt.compare(senha, hash);
  if (!ok) {
    throw new Error("Falhou login...");
  }
};

module.exports = {
  codeToken,
  decodeToken,
  verificaHash,
  geraHash,
  extractTokenFromHeader,
};
