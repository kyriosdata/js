
const callback = () => console.log("setTimeout...");

// setTimeout será executado e a execução prossegue.
// setTimeout "agenda" a chamada à função "callback" após 1s
setTimeout(callback, 1000);
console.log("Após setTimout...");