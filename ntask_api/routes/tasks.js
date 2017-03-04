module.exports = app => {
  const Tasks = app.db.models.Tasks;

  app.route("/tasks")
    //Garante a autenticação do usuário antes de liberar o acesso as rotas.
    .all(app.auth.authenticate())
    .get((req, res) => {
      //"/tasks": Lista de tarefas
      Tasks.findAll({
        where: { user_id: req.user.id }
      })
        //O resultado da consulta ocorre por meio da função then().
        .then(result => res.json(result))
        //Caso exista algum problema, tratamos com a função catch().
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .post((req, res) => {
      //"/tasks": Cadastra uma nova tarefa.
      req.body.user_id = req.user.id;
      //A função Tasks.create faz uma limpeza dos campos que não existem no próprio modelo,
      //então não há problemas em enviar o req.body diretamente.
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

  app.route("/tasks/:id")
    //Garante a autenticação do usuário antes de liberar o acesso as rotas.
    .all(app.auth.authenticate())
    .get((req, res) => {
      //"/tasks/1" :Consulta uma tarefa específica.
      //Procura uma tarefa específica através do seu id.
      Tasks.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.id
         }
      })
        .then(result => {
          if (result) {
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .put((req, res) => {
      //"/task/1" :Atualiza uma tarefa específica.
      //A função Tasks.update faz uma limpeza dos campos que não existem no próprio modelo,
      //então não há problemas em enviar o req.body diretamente.
      Tasks.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.user.id
         }
      })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        })
    })
    .delete((req, res) => {
      //"/task/1" :Exclui uma tarefa específica.
      Tasks.destroy({
        where: {
          id: req.params.id,
          user_id: req.user.id
         }
      })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });
};
