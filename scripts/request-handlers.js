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
    let query = "SELECT id, name, modalidade, tipoTorneio, capacidadeAtual, capacidadeMax FROM torneio";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "torneio": rows });
        }
    });
}
/**
 * Função para retornar a lista de equipas da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getEquipa(req, res) {
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
/**
 * Função para retornar a lista de modalidades da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getModalidade(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT id, modalidade FROM modalidade";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "modalidade": rows });
        }
    });
}
/**
 * Função para retornar a lista de tipos de torneio da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getTipoTorneio(req, res) {
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT id, tipo FROM TipoTorneio";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "tipo": rows });
        }
    });
}

/**
 * Função para retornar a lista de jogos da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getJogos(req, res) {
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
/**
 * Função para retornar a lista de jogos de torneios da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getJogosFromTorneio(req, res) {
    let idTorneio = req.params.id;
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT Jogo.id, Jogo.dataJogo, e1.nome as equipa1, e2.nome as equipa2, torneio.name as NomeTorneio "
    query += "FROM Jogo ";
    query += "join torneioequipa on Jogo.id = torneioequipa.idEquipa ";
    query += "join Torneio on torneio.id = torneioequipa.idTorneio ";
    query += "join equipa e1 on e1.id=jogo.equipa1 ";
    query += "join equipa e2 on e2.id=jogo.equipa2 where torneio.id = ? ";

    connection.query(query, idTorneio, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "jogos": rows });
        }
    });
}
/**
 * Função para retornar a lista de jogos de torneios da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getEquipaFromTorneio(req, res) {
    let idTorneio = req.params.id;
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT e.id, e.nome ";
    query += "FROM equipa e ";
    query += "join torneioequipa t on t.idEquipa = e.id ";
    query += "join torneio on torneio.id = t.idTorneio ";
    query += "where torneio.id = ? ";

    connection.query(query, idTorneio, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "equipa": rows });
        }
    });
}
/**
 * Creates or updates a player
 * //maybe criar uma equipa automaticamente se nao existir???
 */
function createUpdateJogador(req, res) {
    let connection = mysql.createConnection(options);
    let name = req.body.name;
    let birthday = req.body.birthDate;
    let nTelemovel = req.body.nTelemovel;
    let idEquipa = req.body.idEquipa;
    let sql = (req.method === 'PUT') ? "UPDATE Jogador SET name = ?, birthdate = ?, nTelemovel=? , idEquipa = ? WHERE id = ?" : "INSERT INTO Jogador(name, birthdate, nTelemovel, idEquipa) VALUES (?,?,?,?)";
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(sql, [name, birthday, nTelemovel, idEquipa, req.params.id], function (err, rows) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(rows);
            }
        });
    });
}

function createUpdateTorneio(req, res) {
    let connection = mysql.createConnection(options);
    let name = req.body.name;
    console.log(name);
    let modalidade = req.body.modalidade;
    let torneio = req.body.tipoTorneio;
    let capMax = req.body.capacidadeMax;
    let sql = (req.method === 'PUT') ? "UPDATE Torneio SET name = ?, modalidade = ?, tipoTorneio=?, capacidadeMax=? WHERE id = ?" : "INSERT INTO Torneio(name, modalidade, tipoTorneio, capacidadeMax) VALUES (?,?,?,?)";
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(sql, [name, modalidade, torneio, capMax, req.params.id], function (err, rows) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(rows);
            }
        });
    });
}
function deleteTorneio(req, res) {
    let query = 'DELETE FROM torneio WHERE id = ?';
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

function createUpdateEquipa(req, res) {
    let connection = mysql.createConnection(options);
    let name = req.body.name;
    console.log(req.body);
    let sql = (req.method === 'PUT') ? "UPDATE equipa SET nome = ? WHERE id = ?" : "INSERT INTO equipa(nome) VALUES (?)";
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(sql, [name, req.params.id], function (err, rows) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(rows);
            }
        });
    });
}

function joinEquipaTorneio(req, res) {
    let connection = mysql.createConnection(options);
    let idTorneio = req.params.idTorneio;
    let idEquipa = req.params.idEquipa;
    let sql = "INSERT INTO TorneioEquipa(idEquipa, idTorneio) VALUES (?,?)";
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(sql, [idEquipa, idTorneio], function (err, rows) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(rows);
            }
        });
    });
}

module.exports.joinEquipaTorneio = joinEquipaTorneio;

function deleteEquipa(req, res) {
    let query = 'DELETE FROM equipa WHERE id = ?';
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
module.exports.deleteEquipa = deleteEquipa;

function removeJogador(req, res) {
    let query = 'DELETE FROM jogador WHERE id = ?';
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

function getJogadorPerTeam(req, res) {
    let idEquipa = req.params.id;
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT j.id, j.nome, j.birthDate, j.nTelemovel ";
    query += "from Jogador j ";
    query += "join equipa e on j.idEquipa = e.id ";
    query += "where e.id = ?";

    connection.query(query, idEquipa, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "equipa": rows });
        }
    });
}

function getGamesPerTeam(req, res) {
    let idEquipa = req.params.id;
    let connection = mysql.createConnection(options);
    connection.connect();
    let query = "SELECT j.id, j.dataJogo, e.nome, e2.nome ";
    query += "from jogo j ";
    query += "join equipa e on e.id=j.equipa1 ";
    query += "join equipa e2 on e2.id=j.equipa2 ";
    query += "where e.id=? or e2.id=?"

    connection.query(query, idEquipa, idEquipa, function (err, rows) {
        if (err) {
            res.json({ "message": "Error", "error": err });
        } else {
            res.json({ "message": "Success", "equipa": rows });
        }
    });

}
module.exports.getGamesPerTeam = getGamesPerTeam;
module.exports.getJogadorPerTeam = getJogadorPerTeam;
module.exports.createUpdateEquipa = createUpdateEquipa;

module.exports.createUpdateTorneio = createUpdateTorneio;
module.exports.deleteTorneio = deleteTorneio;

module.exports.getJogador = getJogador;
module.exports.getTorneio = getTorneio;
module.exports.getEquipa = getEquipa;
module.exports.getModalidade = getModalidade;
module.exports.getTipoTorneio = getTipoTorneio;
module.exports.getJogos = getJogos
module.exports.getJogosFromTorneio = getJogosFromTorneio;
module.exports.getEquipaFromTorneio = getEquipaFromTorneio;
module.exports.createUpdateJogador = createUpdateJogador;
module.exports.removeJogador = removeJogador;
