// Como verificar se dois objetos são iguais?

let o1 = {
    x : 1,
    y : false
};

let o2 = {
    x : 1,
    y : false
};

// Por que ambas as sentenças abaixo produzem "false"?
console.log("Usando operador de igualdade...")
console.log(o1 == o2);
console.log(o1 === o2);

// Em JavaScript valores primitivos são comparados pelos valores,
// enquanto objetos, vetores e outros, pelas referências.

console.log("Usando as mesmas referências com operador...");
let o3 = o2;
console.log(o3 == o2);
console.log(o3 === o2);

let o4 = {
    x: 2,
    y : false
};

function iguais(a, b) {
    let propertiesOfA = Object.keys(a);
    let propertiesOfB = Object.keys(b);

    if (propertiesOfA.length !== propertiesOfB.length) {
        return false;
    }

    // some retorna true ao primeiro elemento que satisfaz a condição.
    // Se for o caso, retorna true. Caso contrário, retorna false.
    // Só irá retornar true se houver uma propriedade com valores diferentes
    // O retorno da função, contudo, é negado.
    return !propertiesOfA.some(e => a[e] !== b[e]);
}

console.log("Usando a função criada...");
console.log(iguais(o1, o2));
console.log(iguais(o2, o3));
console.log(iguais(o1, o3));
console.log(iguais(o1, o4));