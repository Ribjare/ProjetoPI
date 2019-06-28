"use strict";
const express = require("express");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));

// Commands
//to get all players
app.get('/jogadores', requestHandlers.getJogador);

//to get all tornaments
app.get('/torneios', requestHandlers.getTorneio);

//to get all teams

//to get all games

//to get games per tornament

//to get teams per tornament

//to get games per team

//to get all players

//to get players of a team

//to get

//to create a player

//to create a team

//to create a tornament

//to create a game

//to update a player

//to update a team

//to update a tornament

//to update a game

//to delete a player

//to delete a team

//to delete a tornament

//to delete a game

app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});