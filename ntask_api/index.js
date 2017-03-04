//Importa os módulos e define as constantes.
import express from "express";
import consign from "consign";

const app = express();

//Desabilita os logs gerados pelo consign.
consign({verbose: false})
   .include("libs/config.js")
   .then("db.js")
   .then("auth.js")
   .then("libs/middlewares.js")
   .then("routes")
   .then("libs/boot.js")
   .into(app);

//Exporta a API para que ela seja iniciada ao executar os testes com o Mocha.
module.exports = app;
