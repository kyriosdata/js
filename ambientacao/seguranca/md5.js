const fs = require("fs");
const seguranca = require("crypto");

// Arquivo de entrada (fornecido via linha de comandos)
const arquivo = process.argv[2];

const hash = seguranca.createHash("md5");
const entrada = fs.createReadStream(arquivo);

entrada.on("readable", () => {
    const data = entrada.read();
    if (data) {
        hash.update(data);
    }
});

entrada.on("end", () => {
    let md5 = hash.digest("hex");
    console.log(`${md5}  ${arquivo}`);
});
