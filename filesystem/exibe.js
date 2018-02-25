const fs = require('fs');

if (process.argv.length != 3) {
    console.log("Uso: node exibe <arquivo>");
    process.exitCode = 0;
    return;
}

const path = process.argv[2];

fs.exists(path, existe => {
    if (existe) {
        fs.readFile(path, "utf-8", function (e, d) {
           console.log(d);
        });
    } else {
        console.log("Arquivo não existe: " + path);
    }
});