## Precisamos de um pouco de fluência com ES6...

Vimos uma "extensa" documentação sobre **import** e **export** 
conforme ES6. Vamos aqui fazer mais um uso para que tudo fique
claro. 

Primeiro, optamos por não usar o **require** (que não é padrão).

Segundo, fizemos uso de um _transpiler_, o [Babel](https://babeljs.io/),
que foi configurado por meio do arquivo [.babelrc](.babelrc), após
incluído em nosso projeto ([package.json](package.json)). E, por
comodidade, acrescentamos ao nosso projeto um script para executar o
Babel, denominado de **build**. Ou seja, **npm rum build** executa o
Babel, que converte todos os arquivos .js no diretório corrente para
ES5 e deposita o resultado no diretório **lib**.

O código em ES6 agora é composto por dois arquivos. 
O arquivo [soma.js](soma.js) é o nosso aplicativo, que exibe, na saída
padrão o resultado de uma operação de soma e outra de subtração, ambas
implementadas como métodos da classe **Matematica**, implementada no
arquivo (módulo) [matematica.js](matematica.js).

A classe usa **export default class** (recurso de ES6), enquanto o
módulo [soma.js](soma.js) usa **import Matematica from**, outro 
recurso de ES6. 

Agora, após executar 

```
npm run build
node lib/soma
```

O aplicativo é executado normalmente pelo Node.js, dado que o código
executado está em ES5, após a transformação realizada pelo Babel.