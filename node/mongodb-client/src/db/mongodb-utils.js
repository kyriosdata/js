// Informações necessárias fornecidas via variáveis de ambiente
const mongodbUser = process.env.MONGODB_USER;
const mongodbPass = process.env.MONGODB_PASS;
const server = process.env.MONGODB_SERVER;
const port = process.env.MONGODB_PORT;
const database = process.env.MONGODB_DBNAME;

const credencial = `${mongodbUser}:${mongodbPass}`;
const conexaoUrl = `mongodb://${credencial}@${server}:${port}/${database}`;

module.exports = conexaoUrl;
