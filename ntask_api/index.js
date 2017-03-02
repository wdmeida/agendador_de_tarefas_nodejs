//Importa os módulos e define as constantes.
const app = require("express")();
const consign = require("consign");

consign()
         .include("db.js")
         .then("models")
         .then("libs/middlewares.js")
         .then("routes")
         .then("libs/boot.js")
         .into(app);
