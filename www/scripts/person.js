"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade pessoa 
* @constructs Person
* @param {int} id - id da pessoa
* @param {int} name - nome da pessoa
* @param {Date} birthDate - data de nascimento da pessoa
* @param {int} idCountry - id do pais da pessoa
*/
function Person(id, name, birthDate, idCountry) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.idCountry = idCountry;
};