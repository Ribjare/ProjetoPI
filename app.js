"use strict";
const express = require("express");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));

// Commands
app.get('/modalidades', requestHandlers.getModalidade);


app.get('/tipos', requestHandlers.getTipoTorneio);

//to get all players
app.get('/jogador', requestHandlers.getJogador);

//to get all tornaments
app.get('/torneio', requestHandlers.getTorneio);

//to get all teams
app.get('/equipa', requestHandlers.getEquipa);

//to get all games
app.get('/jogo', requestHandlers.getJogos);

//to get games per tornament
app.get('/torneio/:id/jogo', requestHandlers.getJogosFromTorneio);

//to get teams per tornament
app.get("/torneio/:id/equipa", requestHandlers.getEquipaFromTorneio);

//to get games per team
app.get("/equipa/:id/jogos",requestHandlers.getGamesPerTeam);

//to get players of a team
app.get("/equipa/:id/jogadores", requestHandlers.getJogadorPerTeam);

//to create a player
app.post("/jogador", requestHandlers.createUpdateJogador);

//to create a team
app.post("/equipa", requestHandlers.createUpdateEquipa);

//to create a tornament
app.post("/torneio", requestHandlers.createUpdateTorneio);

//to a team join a tornament
app.post("/torneio/:idTorneio/equipa/:idEquipa", requestHandlers.joinEquipaTorneio);

//to create a game
app.post("/game", requestHandlers.createGame);

//to update a player
app.put("/jogador/:id", requestHandlers.createUpdateJogador);

//to update a team
app.put("/equipa/:id", requestHandlers.createUpdateEquipa);

//to update a tornament
app.put("/torneio/:id", requestHandlers.createUpdateTorneio);

//to update a game
app.put("/game/:id", requestHandlers.updateGame);

//to delete a player
app.delete("/jogador/:id", requestHandlers.removeJogador);

//to delete a team
app.delete("/equipa/:id", requestHandlers.deleteEquipa);

//to delete a tornament
app.delete("/torneio/:id", requestHandlers.deleteTorneio);

//to delete a team from a tornament
app.delete("/torneio/:idTorneio/equipa/:idEquipa", requestHandlers.deleteEquipaTorneio);

//to delete a game from a tornament
app.delete("/torneio/:idTorneio/jogo/:idJogo", requestHandlers.deleteJogoTorneio);


app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});