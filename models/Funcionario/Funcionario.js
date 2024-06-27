const { Sequelize } = require("sequelize");
const {DataTypes} = require("sequelize");
const connection = require("../../database/database");
const Cargo = require("../cargo/Cargo");

const Funcionario = connection.define('funcionario',{
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
      },
     senha:{
        type: DataTypes.STRING,
        allowNull: false,
     },
     login:{
        type: DataTypes.INTEGER,
        allowNull: false,
     }

});

Funcionario.belongsTo(Cargo);
Funcionario.sync({force:false});
module.exports = Funcionario;

