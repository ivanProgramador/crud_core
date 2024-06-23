const express = require("express");
const router = express.Router();
const Produto = require("../Produto/Produto");
const Cargo = require("../cargo/Cargo");
const Estoque = require("../Estoque/Estoque");
const { where, Sequelize } = require("sequelize");
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


router.post("/relatorio_produto_dt",async (req,res)=>{
  

  //data final e data inicial capturadas 
  var data_inicial = req.body.data_inicial;
  var data_final = req.body.data_final;
  
  

    Produto.findAll({
      where:{
         createdAt:{
           [Sequelize.Op.between]:[new Date(data_inicial), new Date(data_final)]
         }
      }
    }).then(produtos=>{

      res.render('relatorios/produtos/rel_prod',{produtos:produtos});

    }); 

   
    
  

});







    







module.exports = router;
