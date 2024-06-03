const express = require("express");
const router = express.Router();
const Funcionario = require("../Funcionario/Funcionario");
const { where } = require("sequelize");

//rotas de formulario
router.get("/funcionario/inicio",(req,res)=>{
    res.render('index');
});
router.get("/funcionario/cadastro",(req,res)=>{
    res.render('cadastro');
});
router.get("/funcionario/edicao/:id",(req,res)=>{
    res.render('edit');
});

//rotas de ação 

router.post("/cadastrar",(req,res)=>{

    var {nome,senha,cargo,login} = req.body;

    Funcionario.create(
        {nome:nome,senha:senha,cargo:cargo,login:login}
    ).then(()=>{
        res.redirect("/funcionario/inicio");
    })
});

router.post("/funcionario/editar",(req,res)=>{

    var {id,nome,senha,cargo,login} = req.body;

    Funcionario.update({nome,senha,cargo,login},{where:{id:id}}).then(()=>{
        res.redirect("/funcionario/inicio");
    })

});

router.post("/funcionario/apagar/:id",(req,res)=>{

    var id = req.params.id;

    Funcionario.destroy({where:{id:id}}).then(()=>{
        res.redirect("/funcionario/inicio");

    });

});



module.exports = router;