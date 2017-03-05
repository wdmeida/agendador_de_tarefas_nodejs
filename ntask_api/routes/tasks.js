module.exports = app => {
  const Tasks = app.db.models.Tasks;

  app.route("/tasks")
    //Garante a autenticação do usuário antes de liberar o acesso as rotas.
    .all(app.auth.authenticate())

    /**
    * @api {get} /tasks Lista tarefas
    * @apiGroup Tarefas
    * @apiHeader {String} Authorization Token de usuário
    * @apiHeaderExample {json} Header
    *   {"Authorization": "JWT xyz.abc.123.hgt"}
    * @apiSuccess {Object[]} tasks Lista de tarefas
    * @apiSuccess {Number} tasks.id Id de registro
    * @apiSuccess {String} tasks.title Título da tarefa
    * @apiSuccess {Boolean} tasks.done Tarefa foi concluída?
    * @apiSuccess {Date} tasks.updated_at Data de atualização
    * @apiSuccess {Date} tasks.created_at Data de cadastro
    * @apiSuccess {Number} tasks.user_id Id do usuário
    * @apiSuccessExample {json} Sucesso
    *   HTTP/1.1 200 OK
    *   [{
    *     "id": 1,
    *     "title": "Estudar",
    *     "done": false,
    *     "updated_at": "2017_02_24T15:46:51.778Z",
    *     "created_at": "2017_02_24T15:46:51.778Z",
    *     "user_id": 1
    *   },{
    *     "id": 2,
    *     "title": "Trabalhar",
    *     "done": false,
    *     "updated_at": "2017_03_24T15:46:51.778Z",
    *     "created_at": "2017_03_24T15:46:51.778Z",
    *     "user_id": 1
    *   }]
    * @apiErrorExample {json} Erro de consulta
    *   HTTP/1.1 412 Precondition Failed
    */
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

    /**
    * @api {post} /tasks Cadastra uma tarefa
    * @apiGroup Tarefas
    * @apiHeader {String} Authorization Token de usuário
    * @apiHeaderExample {json} Header
    *   {"Authorization": "JWT xyz.abc.123.hgt"}
    * @apiParam {String} title Título da tarefa
    * @apiParamExample {json} Entrada
    *   {"title": "Estudar"}
    * @apiSuccess {Number} tasks.id Id de registro
    * @apiSuccess {String} tasks.title Título da tarefa
    * @apiSuccess {Boolean} tasks.done Tarefa foi concluída?
    * @apiSuccess {Date} tasks.updated_at Data de atualização
    * @apiSuccess {Date} tasks.created_at Data de cadastro
    * @apiSuccess {Number} tasks.user_id Id do usuário
    * @apiSuccessExample {json} Sucesso
    *   HTTP/1.1 200 OK
    *   {
    *     "id": 1,
    *     "title": "Estudar",
    *     "done": false,
    *     "updated_at": "2017_02_24T15:46:51.778Z",
    *     "created_at": "2017_02_24T15:46:51.778Z",
    *     "user_id": 1
    *   }
    * @apiErrorExample {json} Erro de consulta
    *   HTTP/1.1 412 Precondition Failed
    */
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

    /**
    * @api {get} /tasks Exibe uma tarefa
    * @apiGroup Tarefas
    * @apiHeader {String} Authorization Token de usuário
    * @apiHeaderExample {json} Header
    *   {"Authorization": "JWT xyz.abc.123.hgt"}
    * @apiParam {id} id Id da tarefa
    * @apiSuccess {Number} tasks.id Id de registro
    * @apiSuccess {String} tasks.title Título da tarefa
    * @apiSuccess {Boolean} tasks.done Tarefa foi concluída?
    * @apiSuccess {Date} tasks.updated_at Data de atualização
    * @apiSuccess {Date} tasks.created_at Data de cadastro
    * @apiSuccess {Number} tasks.user_id Id do usuário
    * @apiSuccessExample {json} Sucesso
    *   HTTP/1.1 200 OK
    *   {
    *     "id": 1,
    *     "title": "Estudar",
    *     "done": false,
    *     "updated_at": "2017_02_24T15:46:51.778Z",
    *     "created_at": "2017_02_24T15:46:51.778Z",
    *     "user_id": 1
    *   }
    * @apiErrorExample {json} Tarefa não existe
        HTTP/1.1 404 Not Found
    * @apiErrorExample {json} Erro de consulta
    *   HTTP/1.1 412 Precondition Failed
    */
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

    /**
    * @api {put} /tasks Atualiza uma tarefa
    * @apiGroup Tarefas
    * @apiHeader {String} Authorization Token de usuário
    * @apiHeaderExample {json} Header
    *   {"Authorization": "JWT xyz.abc.123.hgt"}
    * @apiParam {id} id Id da tarefa
    * @apiParam {String} title Título da tarefa
    * @apiParam {Boolean} done Tarefa foi concluída?
    * @apiParamExample {json} Entrada
    *        {
    *           "title": "Trabalhar",
    *           "done": true
    *        }
    * @apiSuccessExample {json} Sucesso
    *   HTTP/1.1 204 No Content
    * @apiErrorExample {json} Erro de consulta
    *   HTTP/1.1 412 Precondition Failed
    */
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

    /**
    * @api {delete} /tasks Exclui uma tarefa
    * @apiGroup Tarefas
    * @apiHeader {String} Authorization Token de usuário
    * @apiHeaderExample {json} Header
    *   {"Authorization": "JWT xyz.abc.123.hgt"}
    * @apiParam {id} id Id da tarefa
    * @apiSuccessExample {json} Sucesso
    *   HTTP/1.1 204 No Content
    * @apiErrorExample {json} Erro de consulta
    *   HTTP/1.1 412 Precondition Failed
    */
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
