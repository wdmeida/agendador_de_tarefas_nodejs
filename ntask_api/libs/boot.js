module.exports = app => {
  //Sincroniza o Sequelize com o bd, para caso haja alterações nas tabelas
  //tabelas, de acordo com o que for configurado nos modelos da aplicação,
  //essas alterações já sejam refletidas no banco.
  app.db.sync().done(() => {
    app.listen(app.get("port"), () => {
      console.log(`NTask API - porta ${app.get("port")}`);
    });
  });
};
