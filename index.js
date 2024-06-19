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
const Cargo = require("./models/cargo/Cargo");

//controllers
const estoqueController = require("./models/Estoque/estoqueController");
const funcionarioController = require("./models/Funcionario/funcionarioController");
const produtoController = require("./models/Produto/produtoController");
const cargosController = require("./models/cargo/cargosController");
const relatorioController = require("./models/relatorios/relatoriosController");


//rotas
app.get("/",(req,res)=>{
    res.render('index');
});

app.use("/",estoqueController);
app.use("/",funcionarioController);
app.use("/",produtoController);
app.use("/",cargosController);
app.use("/",relatorioController);


app.listen(8080,()=>{
    console.log("app online");
});