import passport from "passport";
import { Strategy } from "passport-jwt";

module.exports = app => {
  const Users = app.db.models.Users;
  const cfg = app.libs.config;

  /*
    O middleware basicamente recebe em seu callback um payload, que é um JSON decodificado
    pela chave secreta cfg.jwtService. Esse payload terá o atributo id, que será id de usuário
    a ser consultado pela função Users.findById(payload.id). Como esse middleware será frequentemente
    acessado, para evitar overhead na aplicação, vamos enviar um objeto simples contendo apenas o id e
    email do usuário autenticados, por meio da função done({null, id: user.id, email:user.email});
  */
  const strategy = new Strategy({secretOrKey: cfg.jwtSecret},
    (payload, done) => {
      Users.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              email: user.email
            });
          }
          return done(null, false);
        })
        .catch(error => done(error, null));
    });

    //Injeta a lógica do middleware.
    passport.use(strategy);
    //Retornar 2 funções do passport para serem utilizadas no decorrer da aplicação.
    return {
      //Inicializa o password.
      initialize: () => {
        return passport.initialize();
      },
      //Autentica o acesso a uma rota.
      authenticate: () => {
        return passport.authenticate("jwt", cfg.jwtSession);
      }
    };
};
