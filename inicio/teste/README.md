## Como testar código em JavaScript?

No arquivo [codigo.js](codigo.js) encontra-se uma única função 
que retorna a soma dos dois argumentos fornecidos.
Um único teste para esta função encontra-se no diretório **test**, 
o diretório padrão usado pela ferramenta [QUnit](https://qunitjs.com/), 
que é o _framework_ selecionado para execução dos nossos testes.

No diretório **test** há um único arquivo, [testa-codigo.js](test/testa-codigo.js). 
Veja <a href="https://asciinema.org/a/161530"> aqui <img src="../../images/asciinema.svg" width="12" align="center"></a> como executar tal teste, inclusive como instalar o QUnit.

Esse exemplo faz uso do conceito de "módulo" para dividir nosso código
entre arquivos. Para tal precisamos fazer uso de 
**module.exports** ou **exports**. A diferença entre ambos nem sempre
é adequadamente compreendida. Para uma explanação satisfatória 
consulte https://medium.freecodecamp.org/node-js-module-exports-vs-exports-ec7e254d63ac. 

## QUnit com resultado exibido via browser (HTML)
Observe que no diretório **test** encontra-se o arquivo **index.html**, que 
faz referência ao arquivo de script **tests.js**. Quando o arquivo 
**index.html** é aberto, o QUnit irá executar os testes contidos em 
**tests.js**. Contudo, dado que estamos usando código escrito para 
o Node.js, que faz uso de módulos (função _require_), não disponível 
em navegadores, precisamos converter nossos testes, neste caso, 
**testa-codigo.js** em código que pode ser executado em um 
navegador. Para fazer isso, nada melhor que o pacote de nome 
sugestivo: _[browserify](http://browserify.org/)_. 

```
npm install -g browserify
browserify testa-codigo.js > tests.js
```

Agora, ao abriar o arquivo **index.html**, você poderá acompanhar 
o resultado da execução do único teste criado.

## É um tédio gerar a cada momento o arquivo contendo os testes...
Testes serão editados a todo momento e, nesse caso, você terá que repetir o
uso do _browserify_ sobre o arquivo de testes atualizado. Ou,
você pode fazer uso da ferramenta **watchify**, conforme abaixo.

```
npm install -g watchify
watchify testa-codigo.js -o tests.js --debug --verbose
```

Agora, o _browserify_ será chamado toda vez que o seu código sofrer alguma
alteração, produzindo uma versão de **tests.js** atualizada, sem necessidade
de intervenção humana. 