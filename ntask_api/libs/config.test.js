/*
  Parâmetros utilizados no arquivo de configuração do sequelize
  com SQLite3:
    database - define o nome da base de dados;
    username - informa o nome de usuário de acesso;
    password - informa a senha do usuário;
    params.dialect - informa qual é o banco de dados a ser usado;
    params.storage - é um atributo específico para o SQLite3, sendo que nele
      é informado o diretório que será gravado o arquivo da base de dados;
    params.define.underscored - padroniza o nome dos campos da tabela em
      minúsculo usando undescore no lugar dos espaçoes em branco.
*/
module.exports = {
  database: "ntask_test",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "ntask.sqlite",
    //Desabilita logs de comandos SQL no terminal. Apenas para melhorar a saída.
    logging: false,
    define: {
      underscored: true
    }
  },
  //Mantém ums string de chave secreta que será base para encode/decode de tokens.
  //É recomendável que essa string seja complexa, utilizando diversos caracteres diferentes.
  //Como é um projeto puramente de estudos, esta chave pode ser divulgada em público.
  jwtSecret: "NTALK_TEST",
  //Informa ao Passport que a autenticação não terá sessão de usuário.
  jwtSession: {session: false}
};
