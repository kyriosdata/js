const objeto = {
    cidade : "Goiânia",
    estado : "Goiás",
    populacao : 2000 * 1000
};

// Serializando em uma sequência de caracteres...

const sequencia = JSON.stringify(objeto);
console.log(sequencia);

// Realizando a operação inversa, ou seja, recuperando o objeto
// a partir da sequência de caracteres...

const recuperado = JSON.parse(sequencia);

// Exibindo campos do objeto recuperado
console.log("Cidade: " + recuperado.cidade);
console.log("Estado: " + recuperado.estado);
console.log("População: " + recuperado.populacao);
