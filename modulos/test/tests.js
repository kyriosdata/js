(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soma = soma;
// Exporta a função soma.

function soma(x, y) {
  return x + y;
}

},{}],2:[function(require,module,exports){
'use strict';

var _codigo = require('../codigo');

QUnit.test('soma trivial', function (assert) {

  // Executa a operação que desejamos testar
  var resultado = (0, _codigo.soma)(3, -1);

  // Verifica se o resultado produzido é o esperado.
  assert.equal(resultado, 2, 'soma incorreta');
}); // Importa a função soma (ES6)

},{"../codigo":1}]},{},[2]);
