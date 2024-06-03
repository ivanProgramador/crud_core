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

router.get("/estoque/edit/:id",(req,res)=>{

    var id = req.params.id;

    Estoque.findOne({id:id}).then(estoque=>{
        
        res.render('edit',{estoque:estoque});
    })

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
    Estoque.update({nome:nome,codigo:codigo,descricao:descricao},{where:{id:id}}).then(()=>{
        res.redirect("/estoque/inicio");
    });
});

router.post("/estoque/apagar/:id",(req,res)=>{
    
    var id = req.params.id;

    Estoque.destroy({where:{id:id}}).then(()=>{
        res.redirect("/estoque/inicio");
    });
});



module.exports = router;