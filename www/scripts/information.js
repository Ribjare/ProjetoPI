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
    this.people = [];
    this.countries = [];
};

/**
 * coloca a palavra "home" no div titulo e limpa o div informação
 */
Information.prototype.showHome = function () {
    document.getElementById("headerTitle").textContent = "Home";
    document.getElementById("formPerson").style.display = "none";
    replaceChilds(this.id, document.createElement("div"));
};

/**
 * coloca a palavra "People" no div titulo e cria dinamicamente uma tabela com a informação das pessoas
 */
Information.prototype.showPerson = function () {
    document.getElementById("headerTitle").textContent = "People";
    document.getElementById("formPerson").style.display = "none";
    const table = document.createElement("table");
    table.appendChild(tableLine(new Person(), true));
    window.info.people.forEach(p => {
        table.appendChild(tableLine(p, false));
    });

    const divTable = document.createElement("divTable");
    divTable.setAttribute("id", "divTable");
    divTable.appendChild(table);

    function deletePersonEventHandler() {
        /** @todo Completar */
        for (const row of table.rows) {
            const checkBox = row.cells[0].firstChild;
            const idPerson = row.cells[1].firstChild.nodeValue;
            if (checkBox && checkBox.checked)
                info.removePerson(idPerson);
        }
    }

    function newPersonEventHandler() {
        /** @todo Completar */
        replaceChilds("divTable", document.createElement("div"));
        document.getElementById("formPerson").action = "javascript: info.processingPerson('create');";
        document.getElementById("formPerson").style.display = "block";
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("date").value = "";
        document.getElementById("countries").innerHTML = "";
        for (const c of info.countries)
        document.getElementById("countries").options.add(new Option(c.name, c.id));
    }

    function updatePersonEventHandler() {
        /** @todo Completar */
        let idPerson = 0;
        for (const row of table.rows) {
            const checkBox = row.cells[0].firstChild;
            if (checkBox && checkBox.checked) {
                idPerson = parseInt(row.cells[1].firstChild.nodeValue);
                break;
            }
        }
        replaceChilds("divTable", document.createElement("div"));
        document.getElementById("formPerson").action = "javascript: info.processingPerson('update');";
        document.getElementById("formPerson").style.display = "block";
        document.getElementById("id").value = idPerson;
        const person = info.people.find(i => i.id == idPerson);
        document.getElementById("name").value = person.name;
        document.getElementById("date").value = person.birthDate;
        const idCountry = person.idCountry;
        for (const c of info.countries) {
            document.getElementById("countries").options.add(new Option(c.name, c.id));
            if (c.id === idCountry) document.getElementById("countries").selectedIndex = info.countries.indexOf(c);
        }
    }
    createButton(divTable, newPersonEventHandler, "New Person");
    createButton(divTable, deletePersonEventHandler, "Delete Person");
    createButton(divTable, updatePersonEventHandler, "Update Person");
    replaceChilds(this.id, divTable);
};

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso person através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getPerson = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/person');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.person.forEach(p => {
                window.info.people.push(p);
            });
        }
    };
    xhr.send();
};

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso país através do verbo GET, usando pedidos assincronos e JSON
  */
Information.prototype.getCountry = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("GET", "/country");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.country.forEach(function (current) {
                window.info.countries.push(current);
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