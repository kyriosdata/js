/**
 * @typedef Livro
 * @type {object}
 * @property {number} numeroPaginas Quantidade de páginas do livro. 
 */

/**
 * Seleciona o ou os livros com a maior quantidade de páginas
 * dentre aqueles fornecidos. Livros sem o atributo "numeroPaginas"
 * ou com este atributo não numérico serão ignorados.
 * 
 * @param {Livro[]} livros Vetor de livros.
 * 
 * @returns {Livro[]} Livro ou livros com a maior quantidade
 * de páginas. Um único livro é retornado se, for o único com a
 * maior quantidade de páginas. Se mais de um livro contém a 
 * maior quantidade de páginas, então todos estes são retornados.
 * Se a coleção de livros fornecida for vazia, então uma coleção
 * vazia é retornada.
 */
function livrosVolumosos(livros) {
}

module.exports = livrosVolumosos;