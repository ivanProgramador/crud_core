const { where } = require("sequelize");
const Cargo = require("./Cargo");
const express = require("express");
const router = express.Router();



//rotas de formulario
router.get("/cargo/inicio",(req,res)=>{
    Cargo.findAll().then(cargos=>{
        res.render('cargos/index',{cargos});
    });
});

router.get("cargos/cadastro",(req,res)=>{

    res.render("/cargos/cadastro");

})

router.get("/cargo/editar/:id",(req,res)=>{

    var id = req.params.id;

    Cargo.findOne({id:id}).then(cargo=>{
        res.render("cargos/edit",{cargo:cargo});
    });

});


//rotas de ação

router.post('/cargo/cadastrar',(req,res)=>{
    var {nome,codigo,descricao} = req.body;
    Cargo.create({nome:nome,codigo:codigo,descricao:descricao}).then(()=>{
        res.redirect("/cargo/inicio");
    });

});

router.post('/cargo/editar',(req,res)=>{
    var {id,nome,codigo,descricao}= req.body;

    Cargo.update({nome:nome,codigo:codigo,descricao:descricao},{where:{id:id}}).then(()=>{
        res.redirect("/cargo/inicio");
        
    })
});

router.post("/cargo/apagar",(req,res)=>{
  var id = req.body.id;

  Cargo.destroy({where:{id:id}}).then(()=>{
    res.redirect("/cargo/inicio");
  });
});


module.exports = router;


