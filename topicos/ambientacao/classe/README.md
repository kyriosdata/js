## Ah, então você quer saber como criar uma classe em JavaScript...
Um exemplo está no arquivo [matematica.js](matematica.js). Este
arquivo possui uma única classe, contendo apenas dois 
métodos (_soma_ e _subtracao_). Observe que a classe é exportada,
torna-se visível externamente por meio de **module.exports**,
última linha deste arquivo.

Uma classe é implementada para agrupar funcionalidade e 
encapsular o que não é relevante para clientes desta classe,
senão a funcionalidade, cuja implementação é atribuição da classe.

Um cliente desta classe está no arquivo [soma.js](soma.js), 
que importa a classe e faz uso do método _soma_ para produzir a soma 
dos argumentos fornecidos a este programa (cliente).

## Como usar?

1. ```npm install```
1. ```node soma 1 -56``` requisita a soma de 1 com -56.
1. ```npm run test``` requisita execução dos testes e exibição de relatório 
correspondente.
1. ```npm run coverage``` requisita execução dos testes, relatório de 
resultados e análise de cobertura.
1. ```npm run lint``` relatório da execução da análise estática sobre o 
código JavaScript. Se nada é relatado, então temos um bom sinal, mas isso 
depende da configuração do [ESLint](https://eslint.org/).
1. ```npm run doc``` gera representação HTML da documentação contida no 
código em JavaScript no diretório **out**.
