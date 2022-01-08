const { Worker, isMainThread } = require("worker_threads");
const worker = new Worker("./calculo.js");
worker.postMessage("calcule");

console.log("worker-example.js isMainThread", isMainThread);