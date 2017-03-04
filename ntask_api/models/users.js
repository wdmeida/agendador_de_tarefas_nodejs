import bcrypt from "bcrypt";

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    /*
      Inclui uma função de hooks, que são funções executáveis antes ou depois
      de uma operação no banco de dados. No nosso caso, vamos incluir uma função
      pare ser executada antes de cadastrar um novo usuário, por meio do uso da
      função beforeCreate. Vamos utilizar bcrypt para criptografar a senha do
      usuário antes de salvá-la na tabela de usuários.
    */
    hooks: {
      beforeCreate: user=> {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  } , {
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Tasks);
      },
      /*
        Inclui mais uma função em classMethods, que será usada para comparar se uma
        senha informada é igual a uma senha criptografada do usuário.
      */
      isPassword: (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword);
      }
    }
  });
  return Users;
};
