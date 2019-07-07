"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade pessoa 
* @constructs Torneio
* @param {int} id - id do torneio
* @param {String} name - nome d o torneio
* @param {String} modalidade - modalidade do torneio
* @param {String} tipo - tipo do torneio
*/
function Jogo(id, equipa1, equipa2,pontosEquipa1,pontosEquipa2 ) {
    this.id = id;
    this.equipa1 = equipa1;
    this.equipa2 = equipa2;
    this.pontosEquipa1 = pontosEquipa1;
    this.pontosEquipa2 = pontosEquipa2;
};