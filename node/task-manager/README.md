## Projeto Gerenciador de Tarefas

Ilustra o emprego de MongoDB, [Mongoose](https://mongoosejs.com/) e
[Expressjs](https://expressjs.com/).

Organização:

- [src/db](src/db) funções utilitárias para acesso ao Mongo, o que inclui
  configuração do Mongoose.
- [src/middleware](src/middleware) inclui recursos de autenticação usando Express e outros itens pertinentes à segurança.
- [src/models](src/models) inclui os modelos (esquemas) das coleções empregadas
  e do relacionamento entre elas (User e Task).
- [src/routers](src/routes) inclui os _front controllers_ imlementados no Express.

## Variáveis de ambiente

As seguintes variáveis de ambiente devem estar definidas.
O uso delas oferece flexibilidade à aplicação e, adicionalmente, segurança.

Por comodidade e testes pode ser empregado o utilitário
[env-cmd](https://www.npmjs.com/package/env-cmd), o que não foi feito aqui.

- **JWT_SECRET**. Senha a ser empregada para a geração de _token_ pelo jsonwebtoken.
- **SENDGRID_API_KEY**. Chave empregada para autenticação da aplicação com o serviço SendGrid.
- **PORT**. Porta empregada pelo ExpressJS. Em particular, o nome desta variável é esperado pelo Heroku. Ou seja, não pode
  ser alterado para **MYAPP_PORT** sem impacto na implantação via Heroku.
- **MONGODB_USER**
- **MONGODB_PASS**
- **MONGODB_SERVER**
- **MONGODB_PORT**
- **MONGODB_DBNAME**

## Modelo de dados

- Coleção de usuários (User)
- Coleção de tarefas (Task)
- Um usuário pode estar associado a zero ou mais tarefas.

## REST API

- Consulte detalhes em  
  https://documenter.getpostman.com/view/215332/Tz5p4x6j

## Orientações

- Crie modelos (diretório **models**)
- Configure as variáveis de ambiente (veja [mongodb-utils.js](./src/db/mongodb-utils.js))
- Configure o [mongoose](./src/db/mongoose.js).

## Iniciando

Disponibiliza _endpoints_ para gerenciamento de tarefas.

- `npm run start` ou
- `npm run dev`

Na sequência pode-se usar uma ferramenta como Postman para efetuar as requisições que vão atingir os _endpoints_ disponibilizados.
