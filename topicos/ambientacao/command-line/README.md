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

