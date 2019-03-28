\[[Home](https://github.com/kyriosdata/js)\] \[[Anterior](../primeiro/README.md)\] \[[Próximo](../teste/README.md)\]

## Segundo exemplo em JavaScript
O aplicativo [quadrado.js](quadrado.js) exibe informações sobre si, 
na saída padrão, além do resultado da chamada de uma função. A função 
simplesmente retorna o quadrado do número fornecido ou, caso nenhum
número seja fornecido, o quadrado do valor 3. 

Veja <a href="https://asciinema.org/a/161533"> aqui <img src="../../../images/asciinema.svg" width="12" align="center"></a> como executar este 
aplicativo. 

Para a chamada `node quadrado` o quadrado de 2 será exibido. Por outro lado,
`node quadrado 10` exibirá o quadrado de 10. Observe o que acontece se você
não fornecer um número como argumento, por exemplo, "x". 

## Próximo passo...
Como você testaria este aplicativo? Bem, este é muito simples, 
você pode até provar que ele está escrito corretamente. Não é preciso
executar um teste. Muitos outros aplicativos, contudo, são compostos por funções mais sofisticadas, e possivelmente contendo um grande número delas tornando inviável provar matematicamente que estão escritos corretamente.

Em vez de uma estratégia rigorosa, usaremos a ferramenta [QUnit](https://qunitjs.com/) para os nossos
testes. A intenção é fornecer evidências de que nossa função faz o que esperamos que ela faça. É o que faremos no nosso primeiro [teste](../teste/README.md).


