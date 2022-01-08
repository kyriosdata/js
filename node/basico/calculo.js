const { isMainThread, parentPort, workerData } = require("worker_threads");

console.log("filho isMainThread", isMainThread);
console.log("Mensagem recebida quando nasci: ", workerData);

parentPort.postMessage("bença");
parentPort.postMessage("1");
parentPort.postMessage("2");
parentPort.postMessage("3");

process.on("exit", () => console.log("filho saindo..."));
