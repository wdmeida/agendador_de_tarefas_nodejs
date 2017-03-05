describe('Routes: Token', () => {

  const Users = app.db.models.Users;

  describe("POST /token", () => {
    //Código a ser executado pré-teste.
    beforeEach(done => {
      Users
        //Limpa a tabela usuários.
        .destroy({where: {}})
        //Cria um novo usuário para executar os testes.
        .then(() => Users.create({
            name: "Wagner",
            email: "wagner@mail.net",
            password: "123456"
        }))
        .then(done());
    });
    /*
        Usaremos a função request.post("/token") para fazer a requisição, já enviando
        o meial e senha através da função send(). A função expect(200) indica que a
        resposta esperada é por meio do status 200 do HTTP.
        Para finalizar, no callback da função end(err, res), é validado se o objeto
        res.body retorna o atributo roken via função expect(res.body).to.include.keys("token").
        Para encerra um teste, é obrigatório a execução do callback done() no final, pois é
        ela a função que o finaliza.
        Preferencialmente, sempre envie a variável err como parâmetro para essa função (done(err)),
        pois caso ocorre um erro na requisição, serão exibidos no terminal os detalhes do erro
        ocorrido.
    */
    //Requisição autenticada por um usuário inválido.
    describe('status 200', () => {
      it("returns authenticated user token", done => {
        request.post("/token")
          .send({
            email: "wagner@mail.net",
            password: "123456"
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys("token");
            done(err);
          });
      });
    });

    //Falhas de autenticação.
    describe('status 401', () => {

      //Requisição com e-mail válido informando senha incorreta.
      it("throws error when password is incorrect", done => {
        request.post("/token")
          .send({
            email: "wagner@mail.net",
            password: "SENHA_ERRADA"
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });

      //Requisição informando um e-mail não cadastrado.
      it("throws error when email not exist", done => {
        request.post("/token")
          .send({
            email: "EMAIL_ERRADO",
            password: "SENHA_ERRADA"
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });

      //Requisição sem e-mail e sem senha.
      it("throws error when email and password are blank", done => {
        request.post("/token")
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});
