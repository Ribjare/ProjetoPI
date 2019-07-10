"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade pessoa 
* @constructs Torneio
* @param {int} id - id do torneio
* @param {String} name - nome do torneio
*/
function Equipa(id, name) {
    this.id = id;
    this.name = name;
    this.jogadores = [];
    this.getJogadores();
}
/**
 * Faz um pedido ao servidor que retorna todos os jogadores
 */
Equipa.prototype.getJogadores = function () {
    var self = this;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/equipa/' + this.id + '/jogadores');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.jogador.forEach(p => {
                self.jogadores.push(new Jogador(p.id, p.nome, p.birthDate, p.nTelemovel));
            });
        }
    };
    xhr.send();
};

