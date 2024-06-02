const Estoque = require("../../models/Estoque/Estoque");
const express = require("express");
const router = express.Router();

//rotas para formularios 
router.get("/estoque/inicio",(req,res)=>{
    res.render('formulario de cadastro');
});

router.get("/estoque/new",(req,res)=>{
    res.render('formulario de cadastro');
});

router.get("/estoque/edit",()=>{
    res.render("formulario de edição");
});

//rotas de ação

router.post("/estoque/cadastrar",(req,res)=>{
    var {nome,codigo,descricao} = req.body;

    Estoque.create({nome:nome,codigo,descricao}).then(()=>{
        res.redirect("/estoque/inicio")
    })
});

router.post("/estoque/editar",(req,res)=>{
    var {id,nome,codigo,descricao} = req.body;
    Estoque.update({nome:nome,codigo,descricao},{where:{id:id}}).then(()=>{
        res.redirect("/estoque/inicio");
    });
});

router.post("/estoque/apagar/:id",(req,res)=>{
    
    var id = req.params.id;

    Estoque.destroy({id:id}).then(()=>{
        res.redirect("/estoque/inicio");
    });
});



module.exports = router;