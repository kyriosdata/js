# Precisa recuperar alguma informação da entrada padrão?

Então provavelmente "readline" pode ser útil conforme ilustrado
em [io.js](io.js). 

Consulte a [documentação](https://nodejs.org/api/readline.html)
de "readline" para detalhes.

## Análise estática, ok, como usar ESLint?
O arquivo [io.js](io.js) não produz nenhum aviso ou erro 
quando o ESLint o analisa. A configuração está no arquivo
[.eslintrc.json](.eslintrc.json).

Na linha de comandos execute
```
eslint io.js
```

Caso o arquivo fornecido contraria alguma regra da configuração
do ESLint, então será indicada qual a regra violada e a linha
em que a violação ocorre. Se este é o caso, então o eslint também
retorna um valor diferente de zero (o que é útil em um processo
de integração contínua).

O desenvolvedor provavelmente fará uso do ESLint de forma automática
enquanto produz código em JavaScript. Vários IDEs possuem plugins
para isso de tal forma que, à medida que código é produzido, 
avisos são fornecidos imediatamente quando o código correspondente
é produzido.

