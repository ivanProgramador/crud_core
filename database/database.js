const Sequelize = require("sequelize");
const connection = new Sequelize('crud_core','root','1234',{

    host:'localhost',
    dialect:'mysql'

});

module.exports = connection;