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
};

/**
 * coloca a palavra "home" no div titulo e limpa o div informação
 */
Information.prototype.showHome = function () {
    document.getElementById("formTorneio").style.display = 'none';
    replaceChilds(this.id, document.createElement("div"));

};


Information.prototype.showTorneio = function () {
    document.getElementById('formTorneio').style.display = 'none';
    document.getElementById('formEquipa').style.display = 'none';


    const table = document.createElement("table");
    table.appendChild(tableLine(new Torneio(), true));
    window.info.torneios.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    var self = this;
    const divTable = document.createElement("divTable");
    divTable.setAttribute("id", "divTable");
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
        document.getElementById('formTorneio').style.display = 'block';
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
                    document.getElementById('modalidadeTorenio').selectedIndex = self.modalidades.indexOf(c);
                }
            }
            document.getElementById('tipoTorneio').innerHTML = '';
            for (const c of self.tipos) {
                document.getElementById('tipoTorneio').options.add(new Option(c.tipo, c.id));
            }
            document.getElementById('capacidadeMaxTorneio').value = torneio.capacidadeMaxima;

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

function getTorneioId(id){
    for(var i = 0; i < window.info.torneios.length; i++){
        if(window.info.torneios[i].id===id){
            return window.info.torneios[i];
        }
    }
}

Information.prototype.showTorneioDetalhes = function (idTorneio) {
    document.getElementById('formEquipa').style.display = 'none';

    const table = document.createElement("table");
    table.appendChild(tableLine(new Jogo(), true));
    console.log(window.info.torneios);
    let torneio = getTorneioId(idTorneio);//window.info.torneios[idTorneio - 1];


    torneio.jogos.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    const table2 = document.createElement('table');
    table2.appendChild(tableLine(new Equipa(), true));
    torneio.equipas.forEach(p => {
        table2.appendChild(tableLine(p, false));
    });

    var self = this;
    const divTable = document.createElement("divTable");
    divTable.setAttribute("id", "divTable");
    let labelJogos = document.createElement("h3");
    labelJogos.innerHTML = "Jogos";
    divTable.appendChild(labelJogos);
    divTable.appendChild(table);

    const divTable2 = document.createElement('divTable');
    divTable2.setAttribute('id', 'divTable2');
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
    function deleteGame(){
        for (const row of table.rows) {
            const checkBock = row.cells[0].firstChild;
            const id = parseInt(row.cells[1].firstChild.nodeValue);
            if (checkBock && checkBock.checked) {
                self.removeJogo(idTorneio, id);
            }
        }
    }


    createButton(divTable2, newTeamEventHandler, "Inscrever Equipa");
    createButton(divTable2, deleteTeamEventHandler, "Apagar Equipa");
    // createButton(divTable2, selectJogoEventHandler, "Selecionar Equipa");
    createButton(divTable, createGames, "Formar Jogos");
    createButton(divTable, deleteGame, "Eliminar Jogo");
    createButton(divTable, function(){}, "Atualizar Jogo");


    const div = document.createElement("div");
    div.setAttribute('id', 'daiv');
    div.appendChild(divTable2);
    div.appendChild(divTable);
    replaceChilds(this.id, div);
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
    const torneio = { id: id, name: name, modalidade: modalidade, tipoTorneio: tipoTorneio, capacidadeAtual: capacidadeAtual, capacidadeMax: capacidadeMax };
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    if (acao === "create") {
        /** @todo Completar */
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let newTorneio = new Torneio(xhr.response.insertId, name, modalidade, tipoTorneio, capacidadeAtual, capacidadeMax);
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
    console.log(torneio.capacidadeAtual + " - "+torneio.capacidadeMaxima);
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
    }else{
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