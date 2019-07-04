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
            document.getElementById('formTorneio').style.display = 'block';
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

    createButton(divTable, newTornamentEventHandler, "Novo Torneio");
    createButton(divTable, deleteTornamentEventHandler, "Apagar Torneio");
    createButton(divTable, updateTornamentEventHandler, "Atualizar Torneio");
    createButton(divTable, selectTornamentEventHandler, "Selecionar Torneio");
    replaceChilds(this.id, divTable);
};

Information.prototype.showTorneioDetalhes = function (idTorneio) {
    document.getElementById('formEquipa').style.display = 'none';

    const table = document.createElement("table");
    table.appendChild(tableLine(new Jogo(), true));
    window.info.torneios[idTorneio-1].jogos.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    const table2 = document.createElement('table');
    table2.appendChild(tableLine(new Equipa(), true));
    window.info.torneios[idTorneio-1].equipas.forEach(p => {
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

                self.removeEquipa(idTorneio,id);
            }
        }
    }
    console.log("gadusdgjiodsg "+ idTorneio);
    function newTeamEventHandler() {
        /** @todo Completar */
        replaceChilds('daiv', document.createElement('div')); //limpar a table
        document.getElementById('formEquipa').action = 'javascript:info.processingEquipa(' + idTorneio + ');';
        document.getElementById('formEquipa').style.display = 'block';
        document.getElementById('formEquipa').reset();

    }


    createButton(divTable2, newTeamEventHandler, "Inscrever Equipa");
    createButton(divTable2, deleteTeamEventHandler, "Apagar Equipa");
    // createButton(divTable2, selectJogoEventHandler, "Selecionar Equipa");
    createButton(divTable, new function(){}, "Formar Jogos");

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
                window.info.torneios.push(new Torneio(p.id, p.name, p.modalidade, p.tipoTorneio, p.capacidadeAtual, p.capacidadeMax));
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
            })
        };
    };
    xhr.send();

}
Information.prototype.getTipos = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/tipos');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.tipo.forEach(p => {
                window.info.tipos.push(p);
            })
        };
    };
    xhr.send();

}

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

    var equipas = info.torneios[idTorneio-1].equipas;
    const equipa = { name: nome };
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let newEquipa = new Equipa(xhr.response.insertId, nome);
            info.torneios[idTorneio-1].equipas.push(newEquipa);
            const xhr2 = new XMLHttpRequest();
            xhr2.onreadystatechange = function () {
                info.showTorneioDetalhes(idTorneio);
            };
            console.log("id");
            console.log(xhr.response.insertId);
            console.log(xhr.response["insertId"]);

            xhr2.open("POST", "/torneio/" + idTorneio + "/equipa/" + newEquipa.id);
            xhr2.send();
        }
    };
    xhr.open("POST", "/equipa");
    console.log(equipa);

    xhr.send(JSON.stringify(equipa));
};
/**
 * Função que apaga o recurso pessoa com ym pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
 Information.prototype.removeEquipa = function (idTorneio, idEquipa) {
    /** @todo Completar */
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/torneio/'+idTorneio+'/equipa/' + idEquipa);
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            info.torneios[idTorneio-1].equipas.splice(info.torneios[idTorneio-1].equipas.findIndex(i => i.id === idEquipa), 1);
            info.showTorneioDetalhes(idTorneio);
        }
    };
    xhr.send();
};