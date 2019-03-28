// Como verificar se dois objetos são iguais?

/**
 * Um objeto para ilustrar operação de igualdade.
 */
let o1 = {
    x : 1,
    y : false
};

/**
 * Mais um objeto apenas para ilustrar operação de igualdade.
 */
let o2 = {
    x : 1,
    y : false
};

// Em JavaScript valores primitivos são comparados pelos valores,
// enquanto objetos, vetores e outros, pelas referências.

/**
 * Um objeto cuja referência é a mesma de outro.
 */
let o3 = o2;

/**
 * Mais um objeto, desta vez, o quarto.
 */
let o4 = {
    x: 2,
    y : false
};

/**
 * @function iguais
 * 
 * Compara os objetos fornecidos e retorna true se forem iguais.
 * Igualdade aqui significa que possuem a mesma quantidade de atributos,
 * os atributos possuem os mesmos nomes com os mesmos valores.
 * 
 * @param {*} a Um dos objetos a ser comparado.
 * @param {*} b O outro objeto. 
 */
function iguais(a, b) {
    let propertiesOfA = Object.keys(a);
    let propertiesOfB = Object.keys(b);

    if (propertiesOfA.length !== propertiesOfB.length) {
        return false;
    }

    // A função "some" retorna true ao primeiro elemento que 
    // satisfaz a condição, neste caso desigualdade entre valores
    // do mesmo atributo. Se nenhum elemento satisfaz, então 
    // retorna false.
    return !propertiesOfA.some(e => a[e] !== b[e]);
}

// Exporta um objeto que compreende quatro outros objetos e uma função.
module.exports = {
    o1, o2, o3, o4, iguais
};
