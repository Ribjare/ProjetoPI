"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade jogo 
* @constructs Torneio
* @param {int} id - id do jogo
* @param {int} equipa1 - id do equipa1
* @param {int} equipa2 - id da equipa2
* @param {int} pontosEquipa1 - numero de pontos da equipa 1
* @param {int} pontosEquipa2 - numero de pontos da equipa 2
*/
function Jogo(id, equipa1, equipa2, pontosEquipa1, pontosEquipa2 ) {
    this.id = id;
    this.equipa1 = equipa1;
    this.equipa2 = equipa2;
    this.pontosEquipa1 = pontosEquipa1;
    this.pontosEquipa2 = pontosEquipa2;
};