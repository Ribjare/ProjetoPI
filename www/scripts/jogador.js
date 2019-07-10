"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade pessoa 
* @constructs jogador
* @param {int} id - id do torneio
* @param {String} name - nome do torneio
* @param {String} birthDay - modalidade do torneio
* @param {String} nTelemovel - tipo do torneio
*/
function Jogador(id, name, birthDay, nTelemovel) {
    this.id = id;
    this.name = name;
    this.birthDay = birthDay;
    this.nTelemovel = nTelemovel;
}