module.exports = (sequelize, DataType) => {
  //Cria ou altera uma tabela no banco de dados.
  //Primeiro parâmetro é o nome da tabela, o segundo um objeto com os campos
  //e o terceiro parâmetro, permite incluir funções estáticas encapsuladas
  //dentro do atributo classMethods. Nele foi criada a função associate(models),
  //que vai permitir realizar uma associação de modelos.
  const Tasks = sequelize.define("Tasks", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    done: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        //Relacionamento do tipo Tasks 1-N Users.
        Tasks.belongsTo(models.Users);
      }
    }
  });
  return Tasks;
};
