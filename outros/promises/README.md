## Entendendo algumas questões...

JavaScript é uma linguagem _single threaded_, ou seja, não há como dois trechos do seu código em JavaScript estar em execução ao mesmo tempo. E qual a repercussão disso? Bem, sabemos que é natural um programa fazer acesso à memória RAM do computador e também ao disco, por exemplo. A memória RAM é "rápida" ([aqui](https://www.google.com.br/search?q=time+to+access+ram&oq=time+to+access+ram&aqs=chrome..69i57.3744j0j7&sourceid=chrome&ie=UTF-8)), algo em torno de 10 nanossegundos. Por outro lado, o acesso a disco é "lento" ([aqui](https://www.computerhope.com/issues/ch001396.htm), algo em torno de 35 microssegundos. Vamos acelerar o acesso a disco para 10 microssegundos e, com base nestes dados, fez a conta? O acesso a um disco é 1000 vezes mais lento que o acesso à memória RAM! Naturalmente, um acesso à rede para recuperar uma imagem, por exemplo, é ainda bem mais lento que o acesso a um disco. Ou seja, uma aplicação possivelmente pode fazer muitas operações enquanto aguarda por um acesso à disco ou à rede!

# Promises

Há muitas fontes de informação sobre _promises_. 
Uma [introdução](https://developers.google.com/web/fundamentals/primers/promises)
sobre o assunto é recomendada. Neste diretório encontram-se vários
pequenos exemplos. O objetivo é permitir que esse conceito seja
adequadamente compreendido e dominado, para que o recurso
correspondente em JavaScript possa ser empregado efetivamente. 
