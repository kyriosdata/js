## Como recuperar argumentos fornecidos ao programa via linha de comandos?

Quando executo um comando como 'dir' ou 'ls', por 
exemplo, podem ser fornecidos argumentos a tais
programas. Como uma aplicação em Node.js recupera os valores fornecidos
via linha de comandos?

Usando JavaScript (Node.js), os argumentos podem ser
recuperados por meio do vetor [process.argv](https://nodejs.org/docs/latest/api/process.html). 

Os exemplos aqui fornecidos permitem:
 - [cl](cl.js) exibe os argumentos fornecidos. A versão [alternativa](cl-foreach.js) faz uso da função "forEach".  
 - [maiuscula](maiuscula.js) converte o primeiro argumento fornecido para letras maiúsculas. 
 - [soma](soma.js) exibe o resultado da soma dos dois primeiros argumentos

## Como usar?

1. ```npm install```
1. ```node cl 1 2 3 quatro``` exibe os argumentos fornecidos.
1. ```node cl-foreach 1 2 três``` exibe argumentos (versão alternativa para a anterior)
1. ```node maiuscula saúde``` converte argumento no equivalente usando letras maiúsculas
1. ```node maiuscula "A vida é bela!"``` converte para maiúscula o único argumento (entre aspas)
1. ```node soma.js 234 345``` exibe o resultado da soma dos argumentos fornecidos (dois primeiros). Sim, você pode ou não fornecer a extensão .js.
1. ```jest``` executa testes e exibe relatório correspondente.
1. ```jest --coverage``` executa testes, exibe o relatório da execução dos testes e da cobertura.
