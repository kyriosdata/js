\[[Home](https://github.com/kyriosdata/js)\] \[[Anterior](../segundo/README.md)\]

## Como testar código em JavaScript?

No arquivo [codigo.js](codigo.js) encontra-se uma única função 
que retorna a soma dos dois argumentos fornecidos.

Um único teste para esta função encontra-se no diretório **test**, 
a saber, o arquivo **codigo.test.js**. Se seguirmos este padrão 
saberemos que **codigo.teste.js** contém código que testa o código 
que está no arquivo **codigo.js**. 

Em tempo, usaremos [Jest](https://jestjs.io/) como ferramenta para execução dos nossos testes.

Conforme acima, no diretório **test** há o arquivo, [codigo.test.js](test/codigo.test.js). Após instalado o Jest, o que pode ser feito com o comando abaixo

```
npm install -g jest
```

você poderá executar os testes neste arquivo com o comando `jest`.

Esse exemplo faz uso do conceito de "módulo" para dividir nosso código
entre arquivos. Para tal precisamos fazer uso de 
**module.exports** ou **exports**. A diferença entre ambos nem sempre
é adequadamente compreendida. Para uma explanação satisfatória 
sugiro este 
[link](https://medium.freecodecamp.org/node-js-module-exports-vs-exports-ec7e254d63ac). 
