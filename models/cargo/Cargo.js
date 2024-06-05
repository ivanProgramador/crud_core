const { Sequelize } = require("sequelize");
const {DataTypes} = require("sequelize");
const connection = require("../../database/database");


const Cargo = connection.define('cargos',{
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    codigo:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: false,
      }

});

Cargo.sync({force:false});
module.exports = Cargo;