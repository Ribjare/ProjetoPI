"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade pessoa 
* @constructs jogador
* @param {int} id - id do torneio
* @param {String} name - nome d o torneio
* @param {String} birthDay - modalidade do torneio
* @param {String} nTelemovel - tipo do torneio
*/
function jogador(id, name, birthDay, nTelemovel, equipa) {
    this.id = id;
    this.name = name;
    this.birthDay = birthDay;
    this.nTelemovel = nTelemovel;
    this.idEquipa = equipa;
};