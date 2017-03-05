import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import logger from "./logger.js";

module.exports = app => {
  app.set("port", 3000);
  app.set("json spaces", 4);

  //Habilita o log das requisições a api.
  app.use(morgan("common", {
    stream: {
      write: (message) => {
        logger.info(message);
      }
    }
  }));
  //Habilita o módulo de segurança helmet para tratar brechas do HTTP.
  app.use(helmet());
  //Habilita o mecanismo de CORS para que gerencie as requisições assíncronas dos outros domínios.
  app.use(cors({
    //Domínios permitidos (Aplicação criada para exemplo.).
    origin: ["http://localhost:3001"],
    //Métodos permitidos.
    methods: ["GET", "POST", "PUT", "DELETE"],
    //Headers obrigatórios.
    allowHeaders: ["Content-Type", "Authorization"]
  }));
  //Ativa a transferência de arquivos compactados (gzip).
  app.use(compression());
  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  //Define um middleware global do Express para limpar o id das requisições.
  app.use((req, res, next) => {
    /*
      Exclui o atributo id dentro do corpo de um requiquisição. Isso porque,
      nas funções de cada requisição, usaremos o req.body como parâmetro das
      funções do Sequelize, e o atributo req.body.id poderá sobrescrever o id
      de uma tarefa, por exemplo, no update ou create.
      Para finalizar o middleware, avisando que deve executar uma função respectiva
      a um método do HTTP, basta incluir no final do callback a função next() para
      ele avisar ao roteador do Express que ele pode executar a próxima função da rota
      ou um próximo middleware abaixo.
    */
    delete req.body.id;
    next();
  });

  //Habilita o servidor de arquivos estáticos do Express, para que ele sirva o conteúdo
  //estático existente na pasta public.
  app.use(express.static("public"));
};
