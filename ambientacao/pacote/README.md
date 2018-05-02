# Ah, como usar pacotes feitos por terceiros?

E dessa forma reutilizar uma infinidade de código disponível?
Você já sabe que o [npm](https://www.npmjs.com/) é a resposta para
gerenciar pacotes, ou código que você pode reutilizar, em JavaScript. 

Na aplicação corrente ([relogio.js](https://github.com/kyriosdata/js/blob/master/ambientacao/pacote/relogio.js)) 
são usados três pacotes: (a) [chalk](https://www.npmjs.com/package/chalk);
(b) [cli-cursor](https://www.npmjs.com/package/cli-cursor) e
(c) [death](https://www.npmjs.com/package/death). Todos eles foram
incluídos via *require*. Naturalmente, apenas isso não é suficiente
para o Node.js executar o programa em 
[relogio.js](https://github.com/kyriosdata/js/blob/master/ambientacao/pacote/relogio.js). 
Tais pacotes precisam estar disponíveis localmente, o que pode
ser realizado via o comando abaixo

```
npm install
```

Mas como o npm sabe quais os pacotes carregar e quais as versões
utilizar? A resposta está no arquivo 
[package.json](https://github.com/kyriosdata/js/blob/master/ambientacao/pacote/package.json). 
Nesse caso, todos os pacotes são necessários durante a execução do
aplicativo e portanto, estão descritos na seção **dependencies**.
Várias outras informações são fornecidas por meio desse arquivo, que
pode ser gerado pelo comando **npm init** que, neste caso, irá requisitar
informação por informação a ser depositada em package.json. 

Enfim, quando você localizar código em [npm](https://www.npmjs.com/) 
relevante para a sua aplicação, você pode inseri-lo no arquivo 
**package.json** e executar o comando **npm install**. 

Em vez da opção manual para editar o arquivo package.json, você pode
usar o comando 

```
npm install <nome do pacote> --save
```

que automaticamente atualiza o arquivo **package.json** contido no diretório
corrente. 