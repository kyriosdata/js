const EventEmitter = require("events");
const fs = require("fs");

const subject = new EventEmitter();
const eventos = () => console.log("Parcial realizada...");

subject.on("parcial", eventos);

// process is an instance of EventEmitter
process.on("exit", () => console.log("saindo..."));

process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
        process.stderr.fd,
        `Não deveria ocorrer, contudo, caught exception: ${err}\n` +
        `Exception origin: ${origin}\n`
    );
});

subject.emit("parcial");
throw new Error();