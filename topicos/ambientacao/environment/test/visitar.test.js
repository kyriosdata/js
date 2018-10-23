const variaveis = require("../visitar");

test("existem várias variáveis de ambiente", () => {    
    let total = 0;
    expect(total).toBe(0);
    variaveis.visitacao(function(x) { total++; });
    expect(total).toBeGreaterThan(10);
});