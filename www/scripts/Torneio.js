"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade pessoa 
* @constructs Torneio
* @param {int} id - id do torneio
* @param {String} name - nome d o torneio
* @param {String} modalidade - modalidade do torneio
* @param {String} tipo - tipo do torneio
*/
function Torneio(id, name, modalidade, tipo) {
    this.id = id;
    this.name = name;
    this.modalidade = modalidade;
    this.tipo = tipo;
    this.equipas = []; //as equipas que participam no torneio
    this.jogos = []; // os jogos que o torneio tem
};

Torneio.prototype.getEquipa = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/torneio/' + this.id + '/equipa');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.equipa.forEach(p => {
                this.equipas.push(p);
            });
        }
    };
    xhr.send();
};
