module.exports = app => {
  const Users = app.db.models.Users;

  app.route("/user")
    .all(app.auth.authenticate())

    /**
    * @api {get} /user Exibe usuário autenticado
    * @apiGroup Usuário
    * @apiHeader {String} Authorization Token de usuário
    * @apiHeaderExample {json} Header
    *     {"Authorization" : "JWT xyz.abc.123.hgt"}
    * @apiSuccess {Number} id Id de registro
    * @apiSuccess {String} name Nome
    * @apiSuccess {String} email Email
    * @apiSuccessExample {json} Sucesso
    *   HTTP/1.1 200 OK
    *     {
    *        "id": 1,
    *        "name": "Wagner",
    *        "email": "wagner@mail.net"
    *     }
    *@apiErrorExample {json} Erro de consulta
    *   HTTP/1.1 412 Precondition Failed
    */
    .get((req, res) =>{
      Users.findById(req.user.id, {
        attributes: ["id", "name", "email"]
      })
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })

    /**
    * @api {delete} /user Exclui usuário autenticado
    * @apiGroup Usuário
    * @apiHeader {String} Authorization Token de usuário
    * @apiHeaderExample {json} Header
    *     {"Authorization" : "JWT xyz.abc.123.hgt"}
    * @apiSuccessExample {json} Sucesso
    *   HTTP/1.1 204 No Content
    *@apiErrorExample {json} Erro na exclusão
    *   HTTP/1.1 412 Precondition Failed
    */
    .delete((req, res) => {
        Users.destroy({where: {id: req.user.id}})
          .then(result => {
              res.sendStatus(204);
          })
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

  /**
  * @api {post} /users Cadastra novo usuário
  * @apiGroup Usuário
  * @apiParam {String} name Nome
  * @apiParam {String} email Email
  * @apiParam {String} password Senha
  * @apiParamExample {json} Entrada
  *     {
  *        "name": "Wagner",
  *        "email": "wagner@mail.net",
  *        "password": "123456"
  *     }
  * @apiSuccess {Number} id Id de registro
  * @apiSuccess {String} name Nome
  * @apiSuccess {String} email Email
  * @apiSuccess {String} password Senha criptografada
  * @apiSuccess {Date} updated_at Data de atualização
  * @apiSuccess {Date} created_at Date de cadastro
  * @apiSuccessExample {json} Sucesso
  *   HTTP/1.1 200 OK
  *     {
  *        "id": 1,
  *        "name": "Wagner",
  *        "email": "wagner@mail.net",
  *        "password": "$2ae13_03987%$",
  *        "updated_at": "2017_02_24T15:46:51.778Z",
  *        "created_at": "2017_02_24T15:46:51.778Z"
  *     }
  *@apiErrorExample {json} Erro de cadastro
  *   HTTP/1.1 412 Precondition Failed
  */
  app.post("/users", (req, res) => {
    Users.create(req.body)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });
};
