const numeroPorExtenso = require("../numero-por-extenso");
const request = require("request");

// AVISO. ESTA NAO É UMA BOA IDEIA: 
// fazer uso de um serviço remoto para obter o resultado
// esperado de um teste. Nem tampouco é considerado
// um teste de unidade. 
test("requisicao remota", (done) => {
    const destino = "https://www.4devs.com.br/ferramentas_online.php";
    const formulario = {
        unidade : "N",
        txt_valor : 23,
        acao : "escrever_extenso"
    };

    const requisicao = {
        url : destino,
        form : formulario
    };

    request.post(requisicao, function(e, r, b) {
        expect(b).toBe(" vinte e três");
        done();
    });
});

function montaRequisicao(n) {
    const destino = "https://www.4devs.com.br/ferramentas_online.php";
    const formulario = {
        unidade : "N",
        txt_valor : n,
        acao : "escrever_extenso"
    };

    return {
        url : destino,
        form : formulario
    };
}
