const { isMainThread } = require("worker_threads");

console.log("calculo.js isMainThread", isMainThread);
