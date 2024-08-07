const { Sequelize } = require("sequelize");
const {DataTypes} = require("sequelize");
const connection = require("../../database/database");
const Estoque = require("../Estoque/Estoque");

const Produto = connection.define('produto',{

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
    },
    preco:{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    unidade:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Produto.belongsTo(Estoque);
Estoque.hasMany(Produto);
Produto.sync({force:false});

module.exports = Produto;