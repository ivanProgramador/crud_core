const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//teste de conexão
connection.authenticate(()=>{console.log('conectado');}).catch(err=>{console.log(err);});

//modelos 
const Estoque = require("./models/Estoque/Estoque");
const Funcionario = require("./models/Funcionario/Funcionario");
const Produto = require("./models/Produto/Produto");

//controllers
const estoqueController = require("./models/Estoque/estoqueController");
const funcionarioController = require("./models/Funcionario/funcionarioController");
const produtoController = require("./models/Produto/produtoController");


//rotas
app.get("/principal",(req,res)=>{
    res.render('index');
});

app.get("/",estoqueController);
app.get("/",funcionarioController);
app.get("/",produtoController);


app.listen(8080,()=>{
    console.log("app online");
})