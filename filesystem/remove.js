const fs = require('file-system');

if (process.argv.length != 3) {
    console.log("Uso: node remove <arquivo>");
    process.exitCode = 0;
    return;
}

let path = process.argv[2];

fs.exists(path, function(existe) {
   if (existe) {
       fs.unlink(path, e => {if (e) console.log(e);});
   } else {
       console.log("Arquivo não encontrado: " + process.argv[2]);
   }
});

// const erro = e => console.log(e);
//
// fs.writeFile("conteudo.txt", new Date(), erro);
// fs.appendFile("conteudo.txt", "\nLinha acrescentada", erro);
// fs.copyFile("conteudo.txt", "copia.txt", erro);
// fs.exists("copia.txt", existe => {
//     if (existe) {
//         console.log("Arquivo já foi copiado...");
//     }
// });
//
// fs.readFile("copia.txt", "utf-8", function(err, data) {
//     console.log(data);
// });



