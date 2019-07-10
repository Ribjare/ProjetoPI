"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade jogador 
* @constructs jogador
* @param {int} id - id do jogador
* @param {String} name - nome do jogador
* @param {Date} birthDay - data de nascimento do jogador
* @param {String} nTelemovel - numero de telemovel do jogador
*/
function Jogador(id, name, birthDay, nTelemovel) {
    this.id = id;
    this.name = name;
    this.birthDay = birthDay;
    this.nTelemovel = nTelemovel;
}