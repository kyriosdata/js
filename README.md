## Se está dando os primeiros passos...

Então sugiro [Eloquent JavaScript](https://eloquentjavascript.net/), um livro interativo. 
Tenho quase certeza que será útil.

## Fase 1 (compreendendo JavaScript e um ambiente de desenvolvimento)

Assumo que você possui familiaridade com alguma linguagem de programação e que tem interesse em aprender JavaScript.

1. Primeiro, o [ambiente](documentos/ambiente.md). Afinal, queremos experimentar JavaScript, tanto escrever código nesta linguagem quanto executar este código, inclusive testes de unidade.

1. Familiarize-se com o ambiente sugerido. Recomendo não saltar os tópicos do seu _Contato "visual" com JavaScript_ ([aqui](topicos/primeiro/README.md)), o que é especialmente válido para quem está iniciando sua programação nesta linguagem.

1. Trechos em JavaScript para quem está iniciando. O [primeiro](topicos/inicio/primeiro/README.md) exemplo, o [segundo](topicos/inicio/segundo/README.md) e, por último, [teste](./topicos/inicio/teste/README.md).

## Fase 2 (realizando operações comuns com JavaScript)
Vamos em frente com [tópicos](topicos/ambientacao/README.md) que *seguramente* você irá precisar quando estiver programando em JavaScript. 

> Observe que agora temos objetivos além de um contato visual, a sugestão é que você leia, compreenda, execute e introduza variações para  observar os resultados.

## Fase 3 (debugging)

- Acrescente a sentença `debugger` na linha onde se deseja inserir um _breakpoint_.
- Execute `node inspect app.js arg1 arg2` talvez tenha que executar `node --inspect-brk app.js arg1 arg2` no Windows. 
- Abra o Chrome, forneça como URL `chrome://inspect`. Na entrada **Target** clique em `inspect`. 
- Na janela que se abre, adicione (+) ao FileSystem o diretório contendo o código fonte que está sendo exerimentado.

## E agora?
Sugiro que faça um [clone](https://asciinema.org/a/161953) do presente projeto caso queira experimentar o código aqui disponível.

- [Promises](outros/promises)

### Tópicos "quentes"...
- Disponibilizar aplicação de linha de comandos como executável ([aqui](https://www.google.com.br/amp/s/x-team.com/blog/a-guide-to-creating-a-nodejs-command/amp/))

