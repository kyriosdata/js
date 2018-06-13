# Ah, como usar pacotes feitos por terceiros?

E dessa forma reutilizar uma infinidade de código disponível?
Você já sabe que o [npm](https://www.npmjs.com/) é a resposta para
gerenciar pacotes, ou código que você pode reutilizar, em JavaScript. 

Na aplicação corrente 
([relogio.js](https://github.com/kyriosdata/js/blob/master/ambientacao/pacote/relogio.js)) 
são usados três pacotes: (a) [chalk](https://www.npmjs.com/package/chalk);
(b) [cli-cursor](https://www.npmjs.com/package/cli-cursor) e
(c) [death](https://www.npmjs.com/package/death). Todos eles foram
incluídos via *require*. 

Observe que a simples inclusão do *require* não é suficiente
para o Node.js executar o programa **relogio.js**.  
Tais pacotes precisam estar disponíveis localmente, o que pode
ser realizado via o comando abaixo

```
npm install
```

Mas como o npm sabe quais os pacotes carregar e quais as versões
utilizar? A resposta está no arquivo 
[package.json](https://github.com/kyriosdata/js/blob/master/ambientacao/pacote/package.json). 
Nesse caso, os pacotes citados acima são necessários durante a execução do
aplicativo e portanto, estão descritos na seção **dependencies**.
Várias outras informações são fornecidas por meio desse arquivo. O comando
**npm init** pode ser empregado para auxiliar a confecção do arquivo 
**package.json**.

Enfim, quando você localizar código no repositório [npm](https://www.npmjs.com/) 
relevante para a sua aplicação, você pode inseri-lo no arquivo 
**package.json** e executar o comando **npm install**. 

Em vez da opção manual para editar o arquivo package.json, você pode
usar o comando 

```
npm install <nome do pacote> --save
```

que automaticamente atualiza o arquivo **package.json** contido no diretório
corrente. Ou seja, caso queira experimentar esse processo, basta criar um diretório e, no diretório
criado, executar a seguinte sequência de passos:
```
npm init
npm install relogio-cli --save
node node_modules/relogio-cli/relogio.js
```

## Como disponibilizar meus pacotes publicamente?
Bem, o presente projeto está publicado no NPM com o nome "relogio-cli". 
Faça a busca em https://www.npmjs.com/ para conferir. A publicação é realizada
para todo usuário que possui uma conta (cadastrada) no NPM. Consulte detalhes
em https://docs.npmjs.com/getting-started/publishing-npm-packages. Para quem
já possui uma conta, basta se autenticar, se ainda não o fez, 
e requisitar a publicação, conforme os comandos abaixo:

```
npm login (se ainda não autenticado)
npm publish
```
