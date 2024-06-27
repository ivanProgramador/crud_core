const express = require("express");
const router = express.Router();
const Produto = require("../Produto/Produto");
const Cargo = require("../cargo/Cargo");
const Estoque = require("../Estoque/Estoque");
const Funcionario = require("../Funcionario/Funcionario");
const { where, Sequelize } = require("sequelize");
const { format } = require('date-fns');

router.get("/relatorio_produto",async(req,res)=>{

  const produtos = await Produto.findAll({
    include:{model:Estoque}
});

  const formattedProdutos = produtos.map(produto => ({
    ...produto.dataValues,
    formattedDate: format(new Date(produto.createdAt), 'dd/MM/yyyy'),
  }));

  res.render('relatorios/produtos/rel_prod',{produtos:formattedProdutos});


});

router.get("/relatorio_produto/:filtro",(req,res)=>{

  var{filtro} = req.params;

  if(filtro=='cre_valor'){

    

    Produto.findAll({order:[['preco','ASC']],include:{model:Estoque} }).then(produtos=>{
      res.render('relatorios/produtos/rel_prod',{produtos:produtos});
  });

  }
  else if(filtro == 'decre_valor'){

   Produto.findAll({order:[['preco','DESC']],include:{model:Estoque}}).then(produtos=>{
      res.render('relatorios/produtos/rel_prod',{produtos:produtos});
   });
  }
  else if(filtro == 'cre_data'){

    Produto.findAll({order:[['createdAt','ASC']],include:{model:Estoque}}).then(produtos=>{
      res.render('relatorios/produtos/rel_prod',{produtos:produtos});
   });

  }
  else if(filtro == 'decre_data'){

    Produto.findAll({order:[['createdAt','DESC']],include:{model:Estoque}}).then(produtos=>{
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
           [Sequelize.Op.between]:[new Date(data_inicial), new Date(data_final)],include:{model:Estoque}
         }
      }
    }).then(produtos=>{

      res.render('relatorios/produtos/rel_prod',{produtos:produtos});

    }); 

   
    
  

});







router.get("/relatorio_funcionarios",async(req,res)=>{

  const funcionarios = await Funcionario.findAll();

  const formattedFuncionarios = funcionarios.map(funcionario => ({
    ...funcionario.dataValues,
    formattedDate: format(new Date(funcionario.createdAt), 'dd/MM/yyyy'),
  }));

  

  res.render('relatorios/funcionarios/rel_func',{funcionarios:formattedFuncionarios});
   
});







    







module.exports = router;
