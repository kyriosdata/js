## Objetos em JavaScript

Módulos podem ser empregados para definir funções a serem reutilizadas
por outros módulos, mas também podem definir objetos, conforme ilutrado
em [definicao.js](definicao.js).

Um aspecto relevante em qualquer linguagem de programação é como
o operador de igualdade "funciona". JavaScript tem suas especificidades
por meio do operador "==" e "===". Veja a função [iguais](igualdade.js)
empregada para comparar objetos e os [testes](test/objetos-operacoes.test.js)
para detalhes.

## Como usar?

1. ```npm install``` instala o projeto.
1. ```node programa``` ilustra uso de propriedades de objetos definidos em outros módulos.
1. ```npm run test``` executa testes e exibe relatório correspondente.
1. ```npm run coverage``` executa testes, exibe relatório correspondente e resultado de cobertura.
1. ```npm run lint``` realiza análise estática e exibe relatório correspondente.
1. ```npm run doc``` produz no diretório **out** a documentação obtida dos arquivos em JavaScript.
