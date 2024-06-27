const express = require("express");
const router = express.Router();
const Funcionario = require("../Funcionario/Funcionario");
const { where } = require("sequelize");
const Cargo = require("../cargo/Cargo");

//rotas de formulario
router.get("/funcionario/inicio",(req,res)=>{

    Funcionario.findAll({
        include:{model:Cargo}
    }).then(funcionarios=>{

        Cargo.findAll().then(cargos=>{

            res.render('funcionarios/index',{funcionarios:funcionarios,cargos:cargos});

        });
    });
});

router.get("/funcionario/cadastro",(req,res)=>{
    res.render('cadastro');
});
router.get("/funcionario/edicao/:id",(req,res)=>{
    
    var id = req.params.id;

    Funcionario.findOne({id:id}).then(funcionario=>{
        res.render('funcionarios/edit',{funcionario:funcionario});
    })
    
});

//rotas de ação 

router.post("/funcionario/cadastrar",(req,res)=>{

    var {nome,senha,cargoId,login} = req.body;

    Funcionario.create(
        {nome:nome,senha:senha,login:login,cargoId:cargoId}
    ).then(()=>{
        res.redirect("/funcionario/inicio");
    })
});

router.post("/funcionario/editar",(req,res)=>{

    var {id,nome,senha,cargo,login} = req.body;

    Funcionario.update({nome:nome,senha:senha,cargo:cargo,login:login},{where:{id:id}}).then(()=>{
        res.redirect("/funcionario/inicio");
    })

});

router.post("/funcionario/apagar",(req,res)=>{

    var id = req.body.id;

    Funcionario.destroy({where:{id:id}}).then(()=>{
        res.redirect("/funcionario/inicio");

    });

});



module.exports = router;