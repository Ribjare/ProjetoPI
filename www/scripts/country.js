"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade país 
* @constructs Person
* @param {int} id - id do país
* @param {int} name - nome do país
* @param {int} shortName - abreviatura
*/
function Country(id, name, shortName) {
    this.id = id;
    this.name = name;
    this.shortName = shortName;
};