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
};

/**
 * coloca a palavra "home" no div titulo e limpa o div informação
 */
Information.prototype.showHome = function () {
    replaceChilds(this.id, document.createElement("div"));
};


Information.prototype.showTorneio = function () {
    
    const table = document.createElement("table");
    table.appendChild(tableLine(new Torneio(), true));
    window.info.torneios.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    const divTable = document.createElement("divTable");
    divTable.setAttribute("id", "divTable");
    divTable.appendChild(table);

    function deletePersonEventHandler() {
        /** @todo Completar */
    }

    function newPersonEventHandler() {
        /** @todo Completar */

    }

    function updatePersonEventHandler() {
        /** @todo Completar */

    }

    createButton(divTable, newPersonEventHandler, "New Person");
    createButton(divTable, deletePersonEventHandler, "Delete Person");
    createButton(divTable, updatePersonEventHandler, "Update Person");
    replaceChilds(this.id, divTable);
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
                window.info.torneios.push(p);
            });
        }
    };
    xhr.send();
};

/**
 * Função que apaga o recurso pessoa com ym pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removePerson = function (id) {
    /** @todo Completar */
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/person/' + id);
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            info.people.splice(info.people.findIndex(i => i.id === id), 1);
            info.showPerson();
        }
    };
    xhr.send();
}

/**
 * Função que insere ou atualiza o recurso pessoa com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 * @param {String} acao - controla qual a operação do CRUD queremos fazer
  */
Information.prototype.processingPerson = function (acao) {
    const id = parseInt(document.getElementById("id").value);
    const name = document.getElementById("name").value;
    const birthDate = document.getElementById("date").value;
    const countryList = document.getElementById("countries");
    const idCountry = countryList.options[countryList.selectedIndex].value;
    const person = { id: id, name: name, birthDate: birthDate, idCountry: idCountry };
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    if (acao === "create") {
        /** @todo Completar */
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                const newPerson = new Person(xhr.response.insertId, name, birthDate, idCountry);
                window.info.people.push(newPerson);
                info.showPerson();
            }
        }
        xhr.open("POST", "/person");
    } else if (acao === "update") {
        /** @todo Completar */
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                info.people[info.people.findIndex(i => i.id === id)] = person;
                info.showPerson();
            }
        }
        xhr.open("PUT", "/person/" + id);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(person));
}