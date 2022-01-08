const { Worker, isMainThread } = require("worker_threads");

const worker = new Worker("./calculo.js", { workerData: "Seja bem-vindo!" });

worker.postMessage("calcule");

console.log("pai isMainThread", isMainThread);

worker.on("message", (data) => console.log("filho requisita: ", data));
worker.on("exit", console.log);

process.on("exit", () => console.log("pai saindo..."));