import supertest from "supertest";
import chai from "chai";
import app from "../index.js";

/*
  Define configurações específicas do Mocha, para que ele carregue o servidor
  da API e os módulos chai e supertest, como variáveis globais. O motivo disso
  é agilizar a execução dos testes, afinal, cada um carregaria esse módulos e,
  se centralizarmos tudo isso em um único arquivo, economizaríamos alguns
  milissegundos de execução dos testes.
*/
global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
