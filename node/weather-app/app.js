console.log("starting");

const exibeInterrogacao = () => console.log("?");
const exibeApos3s = () => console.log("apos 3s");

setTimeout(exibeInterrogacao, 0);

setTimeout(exibeApos3s, 3000);

console.log("stoping");
