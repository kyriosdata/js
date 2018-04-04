## Ah, você precisa persistir um objeto e recuperá-lo posteriormente...

Em JavaScript a transformação de uma objeto em uma sequência de bytes
correspondente, o que é conhecido por serialização, é realizada
por meio do método [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). A operação inversa, ou seja, 
recuperação de uma instância correspondente à sequência de caracteres
geradas por tal método é realizada pelo método [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).

