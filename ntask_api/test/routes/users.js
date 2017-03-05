import jwt from "jwt-simple";

describe("Routes: Users", () => {
  const Users = app.db.models.Users;
  const jwtSecret = app.libs.config.jwtSecret;
  let token;

  beforeEach(done => {
    Users
      .destroy({where: {}})
      .then(() => Users.create({
        name: "Wagner",
        email: "wagner@mail.net",
        password: "12345"
      }))
      .then(user => {
        token = jwt.encode({id: user.id}, jwtSecret);
        done();
      });
  });

  describe("GET /user", () => {
    describe("status 200", () => {
      it("returns an authenticate user", done => {
        request.get("/user")
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql("Wagner");
            expect(res.body.email).to.eql("wagner@mail.net");
            done(err);
          });
      });
    });
  });

  describe("DELETE /user", () => {
    describe("status 200", () => {
      it("deletes an authenticate user", done => {
        request.delete("/user")
          .set("Authorization", `JWT ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });

  describe("POST /users", () => {
    describe("status 200", () => {
      it("creates a new user", done => {
        request.post("/users")
          .send({
            name: "Thais",
            email: "tha@mail.net",
            password: "12345"
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql("Thais");
            expect(res.body.email).to.eql("tha@mail.net");
            done(err);
          });
      });
    });
  });

});
