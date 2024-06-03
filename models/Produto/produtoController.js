const express = require("express");
const router = express.Router();
const Produto = require("./Produto");

//rotas de formulario
router.get("/produto/inicio",(req,res)=>{
    res.render('index');
});

router.get("/produto/cadastro",(req,res)=>{
    res.render('cadastro');
});

router.get("/produto/editar/:id",(req,res)=>{
    var id = req.params.id;
    Produto.findOne({id:id}).then(produto=>{

        res.render('edit',{produto:produto});

    });
   
});

//rotas de ação

router.post("/produto/cadastrar",(req,res)=>{

    var{nome,codigo,descricao,estoque,tipo,preco,unidade} = req.body;

    Produto.create(
        {nome:nome,codigo:codigo,descricao:descricao,estoque:estoque,tipo:tipo,preco:preco,unidade:unidade}
    ).then(()=>{
        res.redirect("/produto/inicio")
    });

});

router.post("/produto/editar",(req,res)=>{

    var{id:id,nome,codigo,descricao,estoque,tipo,preco,unidade} = req.body;

    Produto.update(
        {nome:nome,codigo:codigo,descricao:descricao,estoque:estoque,tipo:tipo,preco:preco,unidade:unidade},
        {where:{id:id}}).then(()=>{
            res.redirect("/produto/inicio");
        });
});


router.post("/produto/apagar",(req,res)=>{
    var id = req.body.id;
    Produto.destroy({where:{id:id}}).then(()=>{
        res.redirect("/produto/inicio")
    }); 
});



module.exports = router;