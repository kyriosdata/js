const http = require("http");
const fs = require("fs");

// Primeiro argumento é a URL do arquivo a ser baixado
const url = process.argv[2];

// Segundo argumento é o nome do arquivo onde serão
// depositados os dados recuperados
const destino = process.argv[3];

const arquivo = fs.createWriteStream(destino);

function arquivoOnClose() {
    console.log("Total de bytes gravados: " + arquivo.bytesWritten);
}

arquivo.on("close", arquivoOnClose);

function handler(resposta) {
    const redirecionamento = resposta.headers["location"];
    if (redirecionamento) {
        console.log("location: ", redirecionamento);
    }
    
    const status = resposta.statusCode;
    if (status != 200) {
        console.log("Algo inesperado (statusCode):", status);
    }

    resposta.pipe(arquivo);
}

function fechar() {
    arquivo.close();
};

function falha(e) {
    console.log("Ocorreu uma falha!", e.message);
}

http.get(url, handler).on("error", falha).on("close", fechar);