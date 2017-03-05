import https from "https";
import fs from "fs";

module.exports = app => {
  //Sincroniza o Sequelize com o bd, para caso haja alterações nas tabelas
  //tabelas, de acordo com o que for configurado nos modelos da aplicação,
  //essas alterações já sejam refletidas no banco.
  if (process.env.NODE_ENV !== "test") {
    const credentials = {
      key: fs.readFileSync("ntask.key", "utf8"),
      cert: fs.readFileSync("ntask.cert", "utf8")
    }

    app.db.sequelize.sync().done(() => {
      https.createServer(credentials, app)
        .listen(app.get("port"), () => {
          console.log(`NTask API - porta ${app.get("port")}`);
        });
    });
  }
};
