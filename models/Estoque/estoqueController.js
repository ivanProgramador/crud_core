const Estoque = require("../../models/Estoque/Estoque");
const express = require("express");
const router = express.Router();

//rotas para formularios 

router.get("/estoque/inicio",(req,res)=>{
    Estoque.findAll().then(estoques=>{
        res.render('estoque/index',{estoques:estoques});

    })
   
});




router.get("/estoque/new",(req,res)=>{
    res.render('formulario de cadastro');
});

router.get("/estoque/editar/:id",(req,res)=>{

    var id = req.params.id;

    Estoque.findOne({id:id}).then(estoque=>{
        
        res.render('estoque/edit',{estoque:estoque});
    })

    
});


//rotas de ação

router.post("/estoque/cadastrar",(req,res)=>{
    var {nome,codigo,descricao} = req.body;

    Estoque.create({nome:nome,codigo:codigo,descricao:descricao}).then(()=>{
        res.redirect("/estoque/inicio")
    });
});



router.post("/estoque/editar",(req,res)=>{


    var id = req.body.id;
    var nome = req.body.nome;
    var codigo = req.body.codigo;
    var descricao = req.body.descricao;


    Estoque.update({nome:nome,codigo:codigo,descricao:descricao},{where:{id:id}}).then(()=>{


        res.redirect("/estoque/inicio");


    });
});





router.post("/estoque/apagar",(req,res)=>{
    
    var id = req.body.id;

    Estoque.destroy({where:{id:id}}).then(()=>{
        res.redirect("/estoque/inicio");
    });
});



module.exports = router;