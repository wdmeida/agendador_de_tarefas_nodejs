//Verifica o valor da varíavel de ambinete do SO, e retorna a configuração
//do ambiente de acordo com a mesma.
module.exports = app => {
  const env = process.env.NODE_ENV;
  if (Boolean(env)) {
    return require(`./config.${env}.js`);
  }
  return require("./config.development.js");
};
