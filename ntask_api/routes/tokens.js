import jwt from "jwt-simple";

module.exports = app => {
  const cfg = app.libs.config;
  const Users = app.db.models.Users;

  /**
   *  @api {post} /token Token autenticado
   *  @apiGroup Credencial
   *  @apiParam {String} email Email de usuário
   *  @apiParam {String} password Senha de usuário
   *  @apiParamExample {json} Entrada
   *      {
   *          "email": "wagner@mail.net",
   *          "password": "123456"
   *       }
   *  @apiSuccess {String} token Token de usuário autenticado
   *  @apiSuccessExample {json} Sucesso
   *    HTTP/1.1 200 OK
   *    {"token": "xyz.abc.123.hgf"}
   *  @apiErrorExample {json} Erro de autenticação
   *    HTTP/1.1 401 Unauthorized
   */
  app.post("/token", (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;

      //Verifica se o email é válido e já cadastrado.
      Users.findOne({where: {email: email}})
        .then(user => {
          if (Users.isPassword(user.password, password)) {
            const payload = {id: user.id};
            res.json({
              //Gera o token do usuário usando o payload (id do usuário) e a chave secreta.
              token: jwt.encode(payload, cfg.jwtSecret)
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch(error => res.sendStatus(401));
    } else {
      res.sendStatus(401);
    }
  });
};
