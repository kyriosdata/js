// Informações necessárias para conexão com o MongoDB
// Todas elas fornecidas via variáveis de ambiente
// Observe que 6 variáveis devem ser definidas.

// Credencial definida por MONGODB_USER e MONGODB_PASS
const mongodbUser = process.env.MONGODB_USER;
const mongodbPass = process.env.MONGODB_PASS;
const credencial = `${mongodbUser}:${mongodbPass}`;

// Protocolo (pode ser 'mongodb' ou 'mongodb+srv')
const protocol = process.env.MONGODB_PROTOCOL;

// Server definido pór MONGODB_SERVER
const server = process.env.MONGODB_SERVER;

// Se porta está definida, então acrescente prefixo ':'
const porta = process.env.MONGODB_PORT;
const port = porta ? `:${porta}` : "";

const database = process.env.MONGODB_DBNAME;

const conexaoUrl = `${protocol}://${credencial}@${server}${port}/${database}`;

module.exports = { conexaoUrl, database };
