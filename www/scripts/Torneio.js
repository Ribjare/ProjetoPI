"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade pessoa 
* @constructs Torneio
* @param {int} id - id do torneio
* @param {String} name - nome d o torneio
* @param {int} modalidade - modalidade do torneio
* @param {int} tipo - tipo do torneio
* @param {int} capacidadeAtual - capacidade atual do torneio
* @param {int} capacidadeMaxima - capacidade maxima do torneio
* @param {Date} data - data do torneio
*/
function Torneio(id, name, modalidade, tipo, capacidadeAtual, capacidadeMaxima, data) {
    this.id = id;
    this.data = data;
    this.name = name;
    this.modalidade = modalidade;
    this.tipo = tipo;
    this.equipas = []; //as equipas que participam no torneio
    this.jogos = []; // os jogos que o torneio tem
    this.getEquipa();
    this.getJogos();
    this.capacidadeAtual = 0;
    this.capacidadeMaxima = capacidadeMaxima;

};
/**
 * Faz um pedido ao servidor que retorna todas as equipas de um torneio
 */
Torneio.prototype.getEquipa = function () {
    var self = this;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/torneio/' + this.id + '/equipa');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.equipa.forEach(p => {
                self.equipas.push(new Equipa(p.id, p.nome));
            });
            self.capacidadeAtual = self.equipas.length;
        }
    };
    xhr.send();
};

/**
 * Função para formar os jogos dependendo do tipo de torneio
 */
Torneio.prototype.formarJogos = function (funcao) {
    // se for da forma de uma liga, isto é, todos vao jogar contra todos pelo menos uma vez
    if (this.tipo == 1) {
        for (var i = 0; i < this.equipas.length - 1; i++) {
            for (var o = 1; o < this.equipas.length; o++) {
                this.criarJogo(this.equipas[i].id, this.equipas[o].id, funcao);
            }
        }
        // se for da forma de torneio
    } else if (this.tipo == 2) {
        for (var i = 0; i < this.equipas.length; i++ , i++) {
            this.criarJogo(this.equipas[i].id, this.equipas[i + 1].id, funcao);
        }
    }
};


/**
 * Faz um pedido ao servidor para a criação de um jogo
 */
Torneio.prototype.criarJogo = function (id1, id2, info) {
    const xhr = new XMLHttpRequest();
    var jogo = { "equipa1": id1, "equipa2": id2, "idTorneio": this.id };
    var self = this;
    xhr.responseType = 'json';
    xhr.open('POST', '/game');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let newJogo = new Jogo(xhr.response.insertId, id1, id2);
            self.jogos.push(newJogo);
            info.showTorneioDetalhes(self.id);
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jogo));
};


/**
 * Faz um pedido ao servidor e retorna todos os jogos de um torneio
 */
Torneio.prototype.getJogos = function () {
    var jogos = this.jogos;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/torneio/' + this.id + '/jogo');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.jogos.forEach(p => {
                jogos.push(new Jogo(p.id, p.equipa1, p.equipa2, p.PontosEquipa1, p.PontosEquipa2));
            });
        }
    };
    xhr.send();
};

/**
 * Retorna uma equipa
 * @param {int} id - id da equipa a procurar
 */
Torneio.prototype.getTeamById = function (id) {
    for (var i = 0; i < this.equipas.length; i++) {
        if (this.equipas[i].id === id) {
            return this.equipas[i];
        }
    }
    return null;
};
