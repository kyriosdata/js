(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
