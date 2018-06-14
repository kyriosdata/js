## Ah, precisamos "dividir" o código em partes menores...

Sim, vimos em [teste](../../inicio/teste) como fazer isso. 
Tínhamos que colocar o código testado em arquivo
diferente do código de teste, para isso usamos um recurso comum em
Node.js, mas que não é padrão: **require**. 

Usamos o [qunit](https://qunitjs.com/) via linha de comandos sem 
dificuldades. Contudo, foi necessário um passo intermediário para que 
o teste pudesse ser executado em um navegador. Neste caso, a ferramenta 
[browserify](http://browserify.org/) foi empregada para converter o 
código de teste em código apto a ser utilizado em um navegador, 
já que os navegadores não admitem o uso do **require**. 

Agora vamos ver como usar o recurso de ES6, padronizado, para "dividir" 
código em JavaScript e que faz uso das palavras reservadas **import** 
e **export**.

## Qual o problema com import/export?

Não há nenhum problema com o uso de **import** ou **export**, contudo,
o Node.js, versão mais recente no momento que escrevo este texto, 
NÃO está preparado para tal, senão por meio de uso de um _flag_ específico e,
adicionalmente, exige a alteração da extensão do nome de arquivos, 
ou seja, estou interpretando isso como inconvenientes a serem evitados.
Ou seja, os exemplos não usam este _flag_ específico nem usam uma extensão
diferente de .js para armazenar código em JavaScript.

Se não vamos empregar a alternativa indicada pelo Node.js, como então 
fazer uso de import/export (ES6), sendo que nem Node.js nem
navegadores mais recentes são compatíveis com import/export?

## Usando o _transpiler_ Babel
A transformação de código em JavaScript (ES6) para código também
em JavaScript, nesse caso para a versão ES5 pode ser realizada 
por um _transpiler_. Um _transpiler_ é uma espécie de compilador 
no qual a saída produzida está na mesma linguagem da entrada, no nosso caso, 
apenas em versões diferentes.

O [Babel](https://babeljs.io/) é um famoso _transpiler_ e vamos utilizá-lo. 
Para tal você pode fazer uso do comando abaixo para disponibilizá-lo para o presente
projeto:

```
npm install --save-dev babel-cli
npm install --save-dev babel-preset-env
```

Os comandos acima irão acrescentar ao arquivo **package.json** as dependências
necessárias para o Babel. Observe que este arquivo do corrente projeto 
já está preparado para tal, ou seja, os comandos acima são desnecessários.

Se o arquivo **package.json** já faz referência ao Babel, então apenas é
necessário requisitar que o mesmo seja obtido por meio de **npm install**.

Antes de usar o Babel é preciso configurá-lo por meio do arquivo
_.babelrc_ que é ilustrado abaixo:

```
{
    "presets" : [ "env" ]
}
```

Agora já podemos usar o Babel, contudo, por comodidade, vamos executar uma ação
adicional: acrescentar ao arquivo **package.json** a seguinte entrada para a propriedade
_scripts_, de forma que o arquivo **package.json** conterá

```
"scripts": {
  "build": "babel *.js -d lib"
}
```  

Finalmente, após o passo anterior podemos simplesmente executar

```  
npm run build
```  

o que irá executar o _transpiler_ para todos os arquivos com a extensão
.js e depositará o resultado correspondente no diretório **lib**. 
Se tudo for executado de forma satisfatória, então o diretório **lib**
conterá código em JavaScript usando a versão ES5, compatível com o código
fornecido na entrada, o que permitirá a 
execução usando o Node.js. 


## Usando o _transpiler_ Babel combinado com _browserify_

Vamos usar a ferramenta [babelify](https://github.com/babel/babelify)
que combina o uso de [Babel](https://babeljs.io/) e 
[browserify](http://browserify.org). 

Já vimos o que o _browserify_ pode fazer no exemplo de [teste](../inicio/teste) 
quando se emprega **require**. Babel é uma opção
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
O código que testa a nossa função está no arquivo 
[testa-codigo.js](test/testa-codigo.js), transcrito abaixo, usando ES6 por 
meio do import.

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
browserify test/testa-codigo.js -o test/tests.js -t [ babelify --presets [ env react ] ]
```

Em consequência, o arquivo **tests.js** é gerado contendo código que 
tanto pode ser compreendido pelo Node.js quanto pelo navegador. Para 
testar via Node.js basta executar o comando 

```
qunit test/tests.js
```

Observe que se executarmos apenas "qunit" este irá procurar por todos os 
arquivos no diretório **test**, inclusive aquele contendo código em ES6,
o que não desejamos. Daí o motivo para fornecer explicitamente o que se deseja
que o QUnit execute. 

Por fim, dado que nosso arquivo [index.html](test/index.html) faz referência 
ao arquivo **tests.js**, basta abrir este
arquivo em um navegador para que os testes sejam executados pelo 
próprio navegador. 

## Como evitar a execução desses comandos "manualmente"?
A resposta está no arquivo **package.json** (propriedade **scripts**). A seguinte sequência de comandos
é suficiente e equivalente a todos os passos anteriores. 

```
npm install
npm run prepara-testes
npm run test
```
