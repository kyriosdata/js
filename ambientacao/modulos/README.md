## Ah, precisamos "dividir" o código em partes menores...

Sim, vimos em [teste](../inicio/teste) como fazer isso. Tínhamos que colocar
o código testado em arquivo
diferente do código de teste, para isso usamos um recurso comum em
Node.js, mas que não é padrão: **require**. 

Usamos o [qunit](https://qunitjs.com/) via linha de comandos sem dificuldades. Contudo, 
foi necessário algum esforço para que o teste pudesse ser executado no
navegador. Foi necessário usar o [browserify](http://browserify.org/) para viabilizar o uso do **require** no navegador. 

Agora vamos ver como usar o recurso de ES6, padronizado, para "dividir" 
código em JavaScript, usando as palavras reservadas **import** e **export**.
Nenhum problema com o uso desse recurso definido e padronizado, exceto que 
nem o Node.js, versão mais recente no momento que escrevo este texto, 
está preparado para tal, senão por meio de uso de um _flag_ específico e 
alteração da extensão do nome de arquivos, além de ser apenas experimental, 
ou seja, estou interpretando isso como inconvenientes a serem evitados.

Como então fazer uso de import/export (ES6) sendo que nem Node.js nem
navegadores mais recentes são compatíveis com import/export?

Vamos lançar mão da ferramenta [babelify](https://github.com/babel/babelify)
que combina o uso de [Babel](https://babeljs.io/) e [browserify](http://browserify.org). 

Já vimos o que o _browserify_ pode fazer no exemplo de [teste](../inicio/teste) quando se emprega **require**. Babel é uma opção
para "compilar" o código em JavaScript (ES6) para código em JavaScript (ES5). 
Essa transformação cuja saída produzida também é código fonte, 
é realizada por uma ferramenta conhecida por _transpiler_. Definições feitas,
vamos à operação. 

## Usando import/export com QUnit (linha de comandos e navegador)

Nosso [código](codigo.js) a ser testado contém uma única função que é
exportada por meio da palavra-chave **export** (ES6), conforme ilustrado abaixo.

```javascript
export function soma(x, y) {
  return x + y;
}
```
O código que testa a nossa função está no arquivo [testa-codigo.js](test/testa-codigo.js), transcrito abaixo, usando ES6 por meio do import.

```javascript
import { soma } from "../codigo";

QUnit.test('soma trivial', function (assert) {

  // Executa a operação que desejamos testar
  let resultado = soma(3, -1);

  // Verifica se o resultado produzido é o esperado.
  assert.equal(resultado, 2, 'soma incorreta');
});
```

Nesse instante,ao usar o QUnit
a saída será _unexpected token import_, indicando que "import" não
é esperado. Como resolver? Primeiro vamos instalar as ferramentas necessárias.

```
npm install --save-dev babelify babel-core babel-preset-env babel-preset-react
```

Após a instalação você pode executar o comando que transforma código
escrito em ES6 para código em ES5, conforme abaixo:

```
browserify test\testa-codigo.js -o test\tests.js -t [ babelify --presets [ env react ] ]
```
Em consequência, o arquivo **tests.js** é gerado contendo código que 
tanto pode ser compreendido pelo Node.js quanto pelo navegador. Para 
testar via Node.js basta executar o comando 

```
qunit test\tests.js
```

Observe que se executarmos apenas "qunit" este irá procurar por todos os 
arquivos no diretório **test**, inclusive aquele contendo código em ES6,
o que não desejamos. Por fim, dado que nosso arquivo [index.html](test/index.html) faz referência ao arquivo **tests.js**, basta abrir este
arquivo em um navegador para que os testes sejam executados pelo 
próprio navegador. 