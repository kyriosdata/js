## Ah, então você quer saber como criar uma classe em JavaScript...
Um exemplo está no arquivo [matematica.js](matematica.js). Este
arquivo possui uma única classe, contendo apenas dois 
métodos (_soma_ e _subtracao_), exportada por meio de 
**module.exports**.

A classe foi implementada para agrupar funcionalidade e 
encapsular o que não é relevante para clientes desta classe.
Um cliente está no arquivo [soma.js](soma.js), que importa
a classe e faz uso do método _soma_ para produzir a soma 
dos argumentos fornecidos a este programa (cliente).
