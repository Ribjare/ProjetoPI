"use strict";
const mysql = require("mysql");
const options = require("./connection-options.json");

/**
 * Função para retornar a lista de pessoas da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getJogador(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT id, nome, DATE_FORMAT(birthDate, '%Y-%m-%d') as birthDate, nTelemovel, idEquipa FROM Jogador";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "jogador": rows });
        }
    });
}
/**
 * Função para retornar a lista de pessoas da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getTorneio(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT id, name, modalidade, tipoTorneio FROM torneio";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "torneio": rows });
        }
    });
}

function getEquipa(req, res){
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT id, nome FROM equipa";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "equipa": rows });
        }
    });
}

function getModalidade(req, res){
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT id, modalidade FROM modalidade";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "equipa": rows });
        }
    });
}

function getTipoTorneio(req, res){
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT id, tipo FROM TipoTorneio";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "equipa": rows });
        }
    });
}

/** gets all games*/ 
function getJogos(req, res){
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT id, DATE_FORMAT(birthDate, '%Y-%m-%d') as birthDate, equipa1, equipa2 FROM Jogo";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "equipa": rows });
        }
    });
}
function getJogosFromTorneio(req, res){
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT id, DATE_FORMAT(birthDate, '%Y-%m-%d') as birthDate, equipa1, equipa2 FROM Jogo";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "equipa": rows });
        }
    });
}

function createUpdatePerson(req, res) {
    /** @todo Completar */
    let connection = mysql.createConnection(options);
    let name = req.body.name;
    let birthday = req.body.birthDate;
    let idCountry = req.body.idCountry;
    let sql = (req.method === 'PUT') ? "UPDATE person SET name = ?, birthdate = ? , idCountry = ? WHERE id = ?" : "INSERT INTO person(name, birthdate, idCountry) VALUES (?,?,?)";
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(sql, [name, birthday, idCountry, req.params.id], function (err, rows) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(rows);
            }
        });
    });
}

function removePerson(req, res) {
    let query = 'DELETE FROM person WHERE id = ?';
    let connection = mysql.createConnection(options);
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(query, [req.params.id], function (err) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        });
    });
}

function removeJogador(req, res){
    // todo
}

function removeTorneio(req, res){

}



/**
 * Função para retornar a lista de paises da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getCountries(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT id, name, shortName FROM Country";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "country": rows });
        }
    });
}
/*
module.exports.getPeople = getPeople;
module.exports.removePerson = removePerson;
module.exports.createUpdatePerson = createUpdatePerson;
module.exports.getCountries = getCountries;
*/
module.exports.getJogador = getJogador;
module.exports.getTorneio = getTorneio;
module.exports.getEquipa = getEquipa;
module.exports.getModalidade = getModalidade;
module.exports.getTipoTorneio = getTipoTorneio;
module.exports.getJogos = getJogos