const fs = require('fs');

if (process.argv.length != 3) {
    console.log("Uso: node remove <arquivo>");
    process.exitCode = 0;
    return;
}

let path = process.argv[2];

fs.unlink(path, e => {
    if (e) {
        console.log(e);
    } else {
        console.log("Arquivo removido satisfatoriamente.");
    }
});
