## Projeto Gerenciador de Tarefas

Ilustra o emprego de MongoDB, [Mongoose](https://mongoosejs.com/) e
[Expressjs](https://expressjs.com/).

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