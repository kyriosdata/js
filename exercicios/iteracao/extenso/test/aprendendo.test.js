const numeroPorExtenso = require("../numero-por-extenso");
const request = require("request");

// AVISO. ESTA NAO É UMA BOA IDEIA: 
// fazer uso de um serviço remoto para obter o resultado
// esperado de um teste. Nem tampouco é considerado
// um teste de unidade por este motivo. 
// DITO ISTO, faço uso frequente desta estratégia, mas
// não para teste, mas quando estou experimentando ou 
// aprendendo algo. 
test("requisicao remota", (done) => {
    request.post(montaRequisicao(23), function(e, r, b) {
        expect(numeroPorExtenso(23)).toBe(b.trim());
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
