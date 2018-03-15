function agora() {
    const Moment = require("moment");
    const corrente = Moment(new Date());
    return corrente.format("LTS");
}

// Porta padrão é 3000 (se variável PORT não indicar outra)
const PORT = process.env.PORT || 3000;

const app = require('http').createServer((req, res) => res.end(agora()));

app.listen(PORT, () => console.log(`Hora corrente na porta ${PORT}`));
