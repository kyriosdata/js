// Exibe as variáveis de ambiente e os respectivos valores
// (variáveis e valores é o objeto 'process.env')
// console.log(process.env);

// Exibe apenas as variáveis de ambiente
// console.log(Object.keys(process.env));

// Variáveis e valores correspondentes
Object.keys(process.env).forEach(e => console.log(`${e} : ${process.env[e]}`));