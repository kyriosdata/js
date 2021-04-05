## Projeto Gerenciador de Tarefas

Ilustra o emprego de MongoDB, [Mongoose](https://mongoosejs.com/) e
[Expressjs](https://expressjs.com/), envio de email, armazenamento de _hash_ de senha, uso de JWT (Json Web Token), upload de arquivo, processamento de
arquivo de imagens e validação de dados.

Organização:

- [src/db](src/db) funções utilitárias para acesso ao Mongo, o que inclui
  configuração do Mongoose.
- [src/middleware](src/middleware) inclui recursos de autenticação usando Express e outros itens pertinentes à segurança.
- [src/models](src/models) inclui os modelos (esquemas) das coleções empregadas
  e do relacionamento entre elas (User e Task).
- [src/routers](src/routes) inclui os _front controllers_ imlementados no Express.
- [config](config) inclui arquivos com a definição de valores para variáveis de
  ambiente empregadas pela aplicação.

## Variáveis de ambiente

As seguintes variáveis de ambiente devem estar definidas. Durante o desenvolvimento, contudo, os arquivos no diretório [config](config) contém valores específicos para os ambientes utilizados. Estes valores, conforme o uso do utilitário [env-cmd](https://www.npmjs.com/package/env-cmd), configurado em [package.json](package.json), sobrescrevem valores das variáveis de ambiente.

Observe que nem todas as variáveis foram definidas nestes arquivos
por uma questão de segurança. Ou seja, terão que ser definidas
especificamente conforme o ambiente em questão empregado.

O uso de variáveis de ambiente oferece flexibilidade à aplicação e, adicionalmente, segurança. Este é o motivo pelo qual a variável **SENDGRID_API_KEY**, por exemplo,
não está definida nos arquivos contidos no diretório **config**.

Por comodidade e testes pode ser empregado o utilitário
[env-cmd](https://www.npmjs.com/package/env-cmd), o que não foi feito aqui.

- **EMAIL_SENDTO_TEST** configura o email a ser empregado
  para os testes.
- **JWT_SECRET**. Senha a ser empregada para a geração de _token_ pelo jsonwebtoken.
- **SENDGRID_API_KEY**. Chave empregada para autenticação da aplicação com o serviço SendGrid.
- **PORT**. Porta empregada pelo ExpressJS. Em particular, o nome desta variável é esperado pelo Heroku. Ou seja, não pode
  ser alterado para **MYAPP_PORT** sem impacto na implantação via Heroku.
- **MONGODB_PROTOCOL** Em geral _mongodb_, mas também pode ser _mongodb+srv_.
- **MONGODB_USER**
- **MONGODB_PASS**
- **MONGODB_SERVER**
- **MONGODB_PORT**. Se não fornecida, então nenhuma porta será fornecida na URL. A porta geralmente usada pelo MongoDB é 27017.
- **MONGODB_DBNAME**. O nome da base de dados.

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

## Deploy no Heroku

- `heroku create tarefas-fabio-kyriosdata-api` (nome deve ser único)
- `heroku config:set key=value` define a variável 'key' com o valor 'value'
- `heroku config` exibe as variáveis desta aplicação Heroku
- `git push heroku master`
