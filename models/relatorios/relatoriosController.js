const express = require("express");
const router = express.Router();
const Produto = require("../Produto/Produto");
const Cargo = require("../cargo/Cargo");
const Estoque = require("../Estoque/Estoque");

router.get("/relatorio_produto",(req,res)=>{
    Produto.findAll().then(produtos=>{
        
        res.render("relatorios/produtos/rel_prod",{produtos:produtos});
    });
});

router.get("/relatorio_cargos",(req,res)=>{
    res.render("/relatorios/cargos/");
  
});

router.get("/relatorio_estoque",(req,res)=>{
    res.render("/relatorios/estoques/");

});




module.exports = router;
