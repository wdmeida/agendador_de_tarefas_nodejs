const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

var db = null;

module.exports = app => {
  if (!db) {
    const config = app.libs.config;
    const sequelize = new Sequelize(
          config.database,
          config.username,
          config.password,
          config.params
      );
      db = {
        sequelize,
        Sequelize,
        models: {}
      };
      const dir = path.join(__dirname, "models");
      /*
          Retorna um array de strings referentes aos nomes de arquivos
          existentes no diretório models. Depois, esse array será iterado,
          para que dentro de seu escopo de iteração sejam carregados todos os
          modelos via função sequilize.import(modelDir) e, em seguida, inseridos
          nesse modelo dentro da estrutura db.models por meio do trecho
          db.models[model.name] = model.
      */
      fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file);
        const model = sequelize.import(modelDir);
        db.models[model.name] = model;
      });
      /*
          Após carregar todos os modelos, uma nova iteração ocorre através
          da função Object.keys(db.models).forEach(key). Ela basicamente
          executará a função db.models[key].associate(db.models) para
          garantir o relacionamento correto entre os modelos.
      */
      Object.keys(db.models).forEach(key => {
        db.models[key].associate(db.models);
      }) ;
  }
  return db;
};
