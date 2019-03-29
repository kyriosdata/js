const numeroPorExtenso = require("../numero-por-extenso");

async function carregaArquivoTexto(arquivo) {
    let falha = false;

    const texto = await fetch(arquivo)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response.text();
        })
        .catch(function (error) {
            falha = true;
            formataMsgErro(error);
        });

    return falha ? null : texto;
}
