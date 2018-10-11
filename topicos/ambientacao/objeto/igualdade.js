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
console.log("Usando operador de igualdade (referências distintas)...")
console.log(o1 == o2);
console.log(o1 === o2);

// Em JavaScript valores primitivos são comparados pelos valores,
// enquanto objetos, vetores e outros, pelas referências.

console.log("Comparandos as referências, que agora são iguais...");
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

    // A função "some" retorna true ao primeiro elemento que satisfaz a condição.
    // Se nenhum elemento satisfaz, então retorna false.
    return !propertiesOfA.some(e => a[e] !== b[e]);
}

console.log("Usando a função criada...");
console.log(iguais(o1, o2));
console.log(iguais(o2, o3));
console.log(iguais(o1, o3));
console.log(iguais(o1, o4));
