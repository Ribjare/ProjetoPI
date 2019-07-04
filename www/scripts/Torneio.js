"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade pessoa 
* @constructs Torneio
* @param {int} id - id do torneio
* @param {String} name - nome d o torneio
* @param {String} modalidade - modalidade do torneio
* @param {String} tipo - tipo do torneio
*/
function Torneio(id, name, modalidade, tipo, capacidadeAtual, capacidadeMaxima) {
    this.id = id;
    this.name = name;
    this.modalidade = modalidade;
    this.tipo = tipo;
    this.capacidadeAtual = capacidadeAtual;
    this.capacidadeMaxima = capacidadeMaxima;
    this.equipas = []; //as equipas que participam no torneio
    this.jogos = []; // os jogos que o torneio tem
    this.getEquipa();
    this.getJogos();

    console.log(this.jogos);
};

Torneio.prototype.getEquipa = function () {
    var equipas = this.equipas;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/torneio/' + this.id + '/equipa');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.equipa.forEach(p => {
                equipas.push(new Equipa(p.id, p.nome));
            });
        }
    };
    xhr.send();
};


Torneio.prototype.getJogos = function () {
    var jogos = this.jogos
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/torneio/' + this.id + '/jogo');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.jogos.forEach(p => {
                jogos.push(new Jogo(p.id, new Date(p.dataJogo), p.equipa1, p.equipa2));
            });
        }
    };
    xhr.send();
};
