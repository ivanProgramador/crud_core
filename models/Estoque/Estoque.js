const { Sequelize } = require("sequelize");
const {DataTypes} = require("sequelize");
const connection = require("../../database/database");

const Estoque = connection.define('estoque',{
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

Estoque.sync({force:false});

module.exports = Estoque;