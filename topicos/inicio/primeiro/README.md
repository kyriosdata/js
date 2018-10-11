\[[Home](https://github.com/kyriosdata/js)\] \[[Anterior](../../documentos/familiarizar.md)\]

## Meu primeiro exemplo em JavaScript

Aplicação mínima composta por uma única linha ilustrando a 
função [console.log](http://devdocs.io/dom/console/log). 
Veja [aqui](https://asciinema.org/a/161505) como esta aplicação 
pode ser construída e executada usando o [Node.js](https://nodejs.org).

Existem as variantes _console.info()_, _console.error()_ e _console.warn()_. Há diferenças entre elas. Além do emprego de cores diferentes (no browser por exemplo), a principal diferença está no uso da saída de erro pelas variantes _error_ e _warn_, enquanto _log_ e _info_ fazem uso da saída padrão, conforme ilustrado abaixo.

Para o programa abaixo, **variantes.js**

```
console.log("log");
console.info("info");
console.warn("warn");
console.error("error");
```

A execução de 

```
node variantes.js > saidapadrao.txt
warn
error
```

irá produzir o arquivo **saidapadrao.txt** contendo apenas o que é gerado por _console.log_ e _console.info_, daí o fato de exibir, na saída de erro, as mensagens produzidas por _console.warn_ e _console.error_. Neste caso, a saída padrão é redirecionada para **saidapadrao.txt**.

Por outro lado, a execução abaixo

```
node variantes.js 2> erropadrao.txt
log
info
```

irá produzir no arquivo **erropadrao.txt** a execução de _console.warn_ e _console.error_, daí o fato de exibir, na saída padrão, apenas o que não foi redirecionado para a sada de erro. Neste caso, a saída de erro é redirecionada para **erropadrao.txt**.
