"use strict";

/** 
* @class Guarda toda informação necessaria na execução do exercicio 
* @constructs Informacao
* @param {string} id - id do elemento HTML que contém a informação.
* 
* @property {string} id - id do elemento HTML que contém a informação.
* @property {country[]} countries - Array de objetos do tipo Country, para guardar todos os countries do nosso sistema
* @property {person[]} people - Array de objetos do tipo person, para guardar todas as pessoas do nosso sistema
*/
function Information(id) {
    this.id = id;
    this.torneios = [];
    this.modalidades = [];
    this.tipos = [];

}

/**
 * coloca a palavra "home" no div titulo e limpa o div informação
 */
Information.prototype.showHome = function () {
    document.getElementById('formTorneio').style.display = 'none';
    document.getElementById('formEquipa').style.display = 'none';
    document.getElementById('formJogo').style.display = 'none';
    document.getElementById('formJogador').style.display = 'none';
    replaceChilds(this.id, document.createElement("div"));
    document.getElementById("intro").style.display = 'block';

};

Information.prototype.showMeusTorneios = function(){
    document.getElementById('formTorneio').style.display = 'none';
    document.getElementById('formEquipa').style.display = 'none';
    document.getElementById('formJogo').style.display = 'none';
    document.getElementById('formJogador').style.display = 'none';
    document.getElementById("intro").style.display = 'none';

    var div = document.createElement('div');
    div.innerText="Pagina nao desenvolvida, seria uma pagina designada ao utilizador registados";
    replaceChilds(this.id, div);
};


Information.prototype.showTorneio = function () {
    document.getElementById('formTorneio').style.display = 'none';
    document.getElementById('formEquipa').style.display = 'none';
    document.getElementById('formJogo').style.display = 'none';
    document.getElementById('formJogador').style.display = 'none';
    document.getElementById("intro").style.display = 'none';


    const table = document.createElement("table");
    table.appendChild(tableLine(new Torneio(), true));
    window.info.torneios.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    var self = this;
    const divTable = document.createElement("divTable");
    divTable.setAttribute("id", "divTable");
    divTable.setAttribute("class", "divTable");

    divTable.appendChild(table);

    function deleteTornamentEventHandler() {
        /** @todo Completar */
        for (const row of table.rows) {
            const checkBock = row.cells[0].firstChild;
            const id = parseInt(row.cells[1].firstChild.nodeValue);
            if (checkBock && checkBock.checked) {
                self.removeTorneio(id);
            }
        }
    }

    function newTornamentEventHandler() {
        /** @todo Completar */
        replaceChilds('divTable', document.createElement('div')); //limpar a table
        document.getElementById('formTorneio').action = 'javascript:info.processingTorneio("create");';
        document.getElementById('formTorneio').style.display = 'flex';
        document.getElementById('formTorneio').reset();
        document.getElementById('modalidadeTorneio').innerHTML = '';
        for (const c of self.modalidades) {
            document.getElementById('modalidadeTorneio').options.add(new Option(c.modalidade, c.id));
        }
        document.getElementById('tipoTorneio').innerHTML = '';
        for (const c of self.tipos) {
            document.getElementById('tipoTorneio').options.add(new Option(c.tipo, c.id));
        }
    }

    function updateTornamentEventHandler() {
        /** @todo Completar */
        let idTorneio = null;
        for (const row of table.rows) {
            const checkBock = row.cells[0].firstChild;
            if (checkBock && checkBock.checked) {
                idTorneio = parseInt(row.cells[1].firstChild.nodeValue);
                break;
            }
        }
        if (idTorneio) {
            replaceChilds('divTable', document.createElement('div'));
            document.getElementById('formTorneio').action = 'javascript:info.processingTorneio("update");';
            document.getElementById('formTorneio').style.display = 'flex';
            document.getElementById('formTorneio').reset();
            document.getElementById('idTorneio').value = idTorneio;
            const torneio = self.torneios.find(i => i.id === idTorneio);
            document.getElementById('nomeTorneio').value = torneio.name;
            for (const c of self.modalidades) {
                document.getElementById('modalidadeTorneio').options.add(new Option(c.modalidade, c.id));
                if (c.id === torneio.id) {
                    document.getElementById('modalidadeTorneio').selectedIndex = self.modalidades.indexOf(c);
                }
            }
            document.getElementById('tipoTorneio').innerHTML = '';
            for (const c of self.tipos) {
                document.getElementById('tipoTorneio').options.add(new Option(c.tipo, c.id));
                if (c.id === torneio.id) {
                    document.getElementById('tipoTorneio').selectedIndex = self.tipos.indexOf(c);
                }
            }
            document.getElementById('capacidadeMaxTorneio').value = torneio.capacidadeMaxima;
            document.getElementById('dataTorneio').value = torneio.data;
        }
    }

    function selectTornamentEventHandler() {
        let idTorneio = null;
        for (const row of table.rows) {
            const checkBock = row.cells[0].firstChild;
            if (checkBock && checkBock.checked) {
                idTorneio = parseInt(row.cells[1].firstChild.nodeValue);
                break;
            }
        }
        if (idTorneio) {
            self.showTorneioDetalhes(idTorneio);
        }
    }

    var divGrande = document.createElement('div');

    createButton(divGrande, newTornamentEventHandler, "Novo Torneio");
    createButton(divGrande, deleteTornamentEventHandler, "Apagar Torneio");
    createButton(divGrande, updateTornamentEventHandler, "Atualizar Torneio");
    createButton(divGrande, selectTornamentEventHandler, "Selecionar Torneio");
    divGrande.appendChild(divTable);

    replaceChilds(this.id, divGrande);
};

function getTorneioId(id) {
    for (var i = 0; i < window.info.torneios.length; i++) {
        if (window.info.torneios[i].id === id) {
            return window.info.torneios[i];
        }
    }
}

Information.prototype.showTorneioDetalhes = function (idTorneio) {
    document.getElementById('formEquipa').style.display = 'none';
    document.getElementById('formJogo').style.display = 'none';


    const table = document.createElement("table");
    table.appendChild(tableLine(new Jogo(), true));
    console.log(window.info.torneios);
    let torneio = getTorneioId(idTorneio);


    torneio.jogos.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    const table2 = document.createElement('table');
    table2.appendChild(tableLine(new Equipa(), true));
    torneio.equipas.forEach(p => {
        table2.appendChild(tableLine(p, false));
    });

    var self = this;
    const divTable = document.createElement("div");
    divTable.setAttribute("id", "divTable");
    divTable.setAttribute("class", "divTable");
    let labelJogos = document.createElement("h3");
    labelJogos.innerHTML = "Jogos";
    divTable.appendChild(labelJogos);
    divTable.appendChild(table);

    const divTable2 = document.createElement('div');
    divTable2.setAttribute('id', 'divTable2');
    divTable2.setAttribute("class", "divTable");

    let labelEquipas = document.createElement("h3");
    labelEquipas.innerHTML = "Equipas";
    divTable2.appendChild(labelEquipas);
    divTable2.appendChild(table2);

    function deleteTeamEventHandler() {
        /** @todo Completar */
        for (const row of table2.rows) {
            const checkBock = row.cells[0].firstChild;
            const id = parseInt(row.cells[1].firstChild.nodeValue);
            if (checkBock && checkBock.checked) {

                self.removeEquipa(idTorneio, id);
            }
        }
    }

    function newTeamEventHandler() {
        /** @todo Completar */
        replaceChilds('daiv', document.createElement('div')); //limpar a table
        document.getElementById('formEquipa').action = 'javascript:info.processingEquipa(' + idTorneio + ');';
        document.getElementById('formEquipa').style.display = 'flex';
        document.getElementById('formEquipa').reset();

    }

    function createGames() {
        torneio.formarJogos(self);
        self.showTorneioDetalhes(idTorneio);
    }

    function deleteGame() {
        for (const row of table.rows) {
            const checkBock = row.cells[0].firstChild;
            const id = parseInt(row.cells[1].firstChild.nodeValue);
            if (checkBock && checkBock.checked) {
                self.removeJogo(idTorneio, id);
            }
        }
    }

    function selectTeam() {
        let idEquipa = null;
        for (const row of table2.rows) {
            const checkBock = row.cells[0].firstChild;
            if (checkBock && checkBock.checked) {
                idEquipa = parseInt(row.cells[1].firstChild.nodeValue);
                break;
            }
        }
        if (idEquipa) {
            self.showEquipa(idEquipa, torneio);

        }
    }

    function updateGame() {

        let idJogo = null;
        for (const row of table.rows) {
            const checkBock = row.cells[0].firstChild;
            if (checkBock && checkBock.checked) {
                idJogo = parseInt(row.cells[1].firstChild.nodeValue);
                break;
            }
        }
        if (idJogo) {
            replaceChilds('divTable', document.createElement('div'));
            replaceChilds('divTable2', document.createElement('div'));

            document.getElementById('formJogo').action = 'javascript:info.processingGame(' + idTorneio + ',' + idJogo + ')';
            document.getElementById('formJogo').style.display = 'flex';
            document.getElementById('formJogo').reset();
            document.getElementById('idJogo').value = idJogo;

            const jogo = torneio.jogos.find(i => i.id === idJogo);

            document.getElementById('idEquipa1').value = jogo.equipa1;
            document.getElementById('idEquipa2').value = jogo.equipa2;

            document.getElementById('resultado1').value = jogo.pontosEquipa1;
            document.getElementById('resultado2').value = jogo.pontosEquipa2;
        }
    }

    createButton(divTable2, newTeamEventHandler, "Inscrever Equipa");
    createButton(divTable2, deleteTeamEventHandler, "Apagar Equipa");
    createButton(divTable2, selectTeam, "Selecionar Equipa");
    // createButton(divTable2, selectJogoEventHandler, "Selecionar Equipa");
    createButton(divTable, createGames, "Formar Jogos");
    createButton(divTable, deleteGame, "Eliminar Jogo");
    createButton(divTable, updateGame, "Atualizar Jogo");


    const div = document.createElement("div");
    div.setAttribute('id', 'daiv');
    div.appendChild(divTable2);
    div.appendChild(divTable);
    replaceChilds(this.id, div);
};

Information.prototype.showEquipa = function (idEquipa, torneio) {
    document.getElementById('formEquipa').style.display = 'none';
    document.getElementById("intro").style.display = 'none';
    document.getElementById("formJogador").style.display = 'none';


    const table = document.createElement("table");
    table.appendChild(tableLine(new Jogador(), true));

    var equipa = torneio.getTeamById(idEquipa);

    equipa.jogadores.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    var self = this;
    const divTable = document.createElement("divTable");
    divTable.setAttribute("class", "divTable");

    let labelJogos = document.createElement("h3");
    labelJogos.innerHTML = "JOGADORES";
    divTable.appendChild(labelJogos);
    divTable.appendChild(table);


    function deletePlayerEventHandler() {
        for (const row of table.rows) {
            const checkBock = row.cells[0].firstChild;
            const id = parseInt(row.cells[1].firstChild.nodeValue);
            if (checkBock && checkBock.checked) {
                self.removePlayer(id, equipa, torneio);
            }
        }
    }

    function newPlayerEventHandler() {
        //console.log("not implemented");
        replaceChilds('daiv', document.createElement('div'));
        document.getElementById('formJogador').action = 'javascript:info.processingPlayer(' + equipa.id + ',' + torneio.id + ');';
        document.getElementById('formJogador').style.display = 'flex';
        document.getElementById('formJogador').reset;
    }

    createButton(divTable, newPlayerEventHandler, "Criar Jogador");
    createButton(divTable, deletePlayerEventHandler, "Eliminar Jogador");


    const div = document.createElement("div");
    div.setAttribute('id', 'daiv');
    div.appendChild(divTable);
    replaceChilds(this.id, div);
};

Information.prototype.processingPlayer = function (idEquipa, idTorneio) {
    const id = parseInt(document.getElementById("idJogador").value);
    const nomeJogador = document.getElementById("nomeJogador").value;
    const nTelemovel = document.getElementById("numeroTelefone").value;
    const dataNascimento = document.getElementById("dataNascimento").value;

    let torneio = getTorneioId(idTorneio);
    let equipa = torneio.getTeamById(idEquipa);

    console.log("supp");

    const jogador = { id: id, name: nomeJogador, nTelemovel: nTelemovel, birthDate: dataNascimento, idEquipa: equipa.id };

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    /** @todo Completar */
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let newJogador = new Jogador(xhr.response.insertId, nomeJogador, new Date(dataNascimento), numeroTelefone);
            equipa.jogadores.push(newJogador);
            info.showEquipa(equipa.id, torneio);
        }
    };
    xhr.open("POST", "/jogador");

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jogador));
}

Information.prototype.removePlayer = function (idJogador, equipa, torneio) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/jogador/' + idJogador);
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            equipa.jogadores.splice(equipa.jogadores.findIndex(i => i.id === idJogador), 1);
            info.showEquipa(equipa.id, torneio);
        }
    }
    xhr.send();
};
/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso person através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getTorneio = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/torneio');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.torneio.forEach(p => {
                console.log(p);
                window.info.torneios.push(new Torneio(p.id, p.name, p.modalidade, p.tipoTorneio, p.capacidadeAtual, p.capacidadeMax, p.dataTorneio));
            });
        }
    };
    xhr.send();

};

Information.prototype.getModalidades = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/modalidades');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.modalidade.forEach(p => {
                window.info.modalidades.push(p);
            });
        }
    };
    xhr.send();

};

Information.prototype.getTipos = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/tipos');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.tipo.forEach(p => {
                window.info.tipos.push(p);
            });
        }
    };
    xhr.send();

};

/**
 * Função que apaga o recurso pessoa com ym pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removeTorneio = function (id) {
    /** @todo Completar */
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/torneio/' + id);
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            info.torneios.splice(info.torneios.findIndex(i => i.id === id), 1);
            info.showTorneio();
        }
    };
    xhr.send();
};

/**
 * Função que insere ou atualiza o recurso pessoa com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 * @param {String} acao - controla qual a operação do CRUD queremos fazer
  */
Information.prototype.processingTorneio = function (acao) {
    const id = parseInt(document.getElementById("idTorneio").value);
    const name = document.getElementById("nomeTorneio").value;
    const modalidadeAux = document.getElementById("modalidadeTorneio");
    const modalidade = modalidadeAux.options[modalidadeAux.selectedIndex].value;
    const tipoTorneioAux = document.getElementById("tipoTorneio");
    const tipoTorneio = tipoTorneioAux.options[tipoTorneioAux.selectedIndex].value;
    const capacidadeAtual = document.getElementById('capacidadeAtual').value;
    const capacidadeMax = document.getElementById("capacidadeMaxTorneio").value;
    const dataTorneio = document.getElementById("dataTorneio").value;

    const torneio = {
        id: id, dataTorneio: dataTorneio, name: name, modalidade: modalidade, tipoTorneio: tipoTorneio,
        capacidadeAtual: capacidadeAtual, capacidadeMax: capacidadeMax
    };
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    if (acao === "create") {
        /** @todo Completar */
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let newTorneio = new Torneio(xhr.response.insertId, name, modalidade, tipoTorneio, capacidadeAtual, capacidadeMax, dataTorneio);
                window.info.torneios.push(newTorneio);
                info.showTorneio();
            }
        };
        xhr.open("POST", "/torneio");
    } else if (acao === "update") {
        /** @todo Completar */
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                info.torneios[info.torneios.findIndex(i => i.id === id)] = torneio;
                info.showTorneio();
            }
        };
        xhr.open("PUT", "/torneio/" + id);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(torneio));

};

Information.prototype.processingEquipa = function (idTorneio) {

    const nome = document.getElementById('nomeEquipa').value;
    var torneio = getTorneioId(idTorneio);
    var equipas = getTorneioId(idTorneio).equipas;
    const equipa = { name: nome };
    console.log(torneio.capacidadeAtual + " - " + torneio.capacidadeMaxima);
    if (torneio.capacidadeAtual !== torneio.capacidadeMaxima) {
        console.log("sadasdasd");
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let newEquipa = new Equipa(xhr.response.insertId, nome);
                torneio.equipas.push(newEquipa);
                const xhr2 = new XMLHttpRequest();

                xhr2.onreadystatechange = function () {

                    info.showTorneioDetalhes(idTorneio);
                };

                xhr2.open("POST", "/torneio/" + idTorneio + "/equipa/" + newEquipa.id);
                xhr2.setRequestHeader('Content-Type', 'application/json');
                xhr2.send();
            }
        };
        xhr.open("POST", "/equipa");
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(equipa));
    } else {
        info.showTorneioDetalhes(idTorneio);
    }
};
/**
 * Função que apaga o recurso pessoa com ym pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removeEquipa = function (idTorneio, idEquipa) {
    /** @todo Completar */
    const xhr = new XMLHttpRequest();
    var torneio = getTorneioId(idTorneio);
    xhr.open('DELETE', '/torneio/' + idTorneio + '/equipa/' + idEquipa);
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            torneio.equipas.splice(torneio.equipas.findIndex(i => i.id === idEquipa), 1);
            info.showTorneioDetalhes(idTorneio);
        }
    };
    xhr.send();
};

/**
 * Função que apaga o recurso pessoa com ym pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removeJogo = function (idTorneio, idJogo) {
    /** @todo Completar */
    const xhr = new XMLHttpRequest();
    var torneio = getTorneioId(idTorneio);
    xhr.open('DELETE', '/torneio/' + idTorneio + '/jogo/' + idJogo);
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            torneio.jogos.splice(torneio.jogos.findIndex(i => i.id === idJogo), 1);
            info.showTorneioDetalhes(idTorneio);
        }
    };
    xhr.send();
};


Information.prototype.processingGame = function (idTorneio, idJogo) {


    var self = this;

    let id = document.getElementById('idJogo').value;

    var torneio = getTorneioId(idTorneio);

    let equipa1 = document.getElementById('idEquipa1').value;
    let equipa2 = document.getElementById('idEquipa2').value;

    let resultado1 = document.getElementById('resultado1').value;
    let resultado2 = document.getElementById('resultado2').value;

    const jogo2 = { id: id, equipa1: equipa1, equipa2: equipa2, resultado1: resultado1, resultado2: resultado2 };

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('PUT', '/game/' + idJogo);
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            torneio.jogos[torneio.jogos.findIndex(i => i.id === idJogo)] = jogo2;
            self.showTorneioDetalhes(idTorneio);
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jogo2));
};
