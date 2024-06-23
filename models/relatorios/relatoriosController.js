const express = require("express");
const router = express.Router();
const Produto = require("../Produto/Produto");
const Cargo = require("../cargo/Cargo");
const Estoque = require("../Estoque/Estoque");
const { where } = require("sequelize");
const { format } = require('date-fns');

router.get("/relatorio_produto",(req,res)=>{

  Produto.findAll().then(produtos=>{

      res.render('relatorios/produtos/rel_prod',{produtos:produtos});

  });

});

router.get("/relatorio_produto/:filtro",(req,res)=>{

  var{filtro} = req.params;

  if(filtro=='cre_valor'){

    Produto.findAll({order:[['preco','ASC']]}).then(produtos=>{
      res.render('relatorios/produtos/rel_prod',{produtos:produtos});
  });

  }
  else if(filtro == 'decre_valor'){

   Produto.findAll({order:[['preco','DESC']]}).then(produtos=>{
      res.render('relatorios/produtos/rel_prod',{produtos:produtos});
   });
  }
  else if(filtro == 'cre_data'){

    Produto.findAll({order:[['createdAt','ASC']]}).then(produtos=>{
      res.render('relatorios/produtos/rel_prod',{produtos:produtos});
   });

  }
  else if(filtro == 'decre_data'){

    Produto.findAll({order:[['createdAt','DESC']]}).then(produtos=>{
      res.render('relatorios/produtos/rel_prod',{produtos:produtos});
   });



  }

 

});



    







module.exports = router;
