const bodyParser = require("body-parser");

module.exports = app => {
  app.set("port", 3000);
  app.set("json spaces", 4);
  app.use(bodyParser, json());
  //Define um middleware global do Express para limpar o id das requisições.
  app.use((res, res, next) => {
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
};
