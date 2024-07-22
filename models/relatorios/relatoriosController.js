const express = require("express");
const router = express.Router();
const Produto = require("../Produto/Produto");
const Cargo = require("../cargo/Cargo");
const Estoque = require("../Estoque/Estoque");
const Funcionario = require("../Funcionario/Funcionario");
const { where, Sequelize } = require("sequelize");
const { format } = require('date-fns');

router.get("/relatorio_produto",async(req,res)=>{

  const produtos = await Produto.findAll({include:{model:Estoque}});

  const formattedProdutos = produtos.map(produto => ({
    ...produto.dataValues,
    formattedDate: format(new Date(produto.createdAt), 'dd/MM/yyyy'),
  }));

  res.render('relatorios/produtos/rel_prod',{produtos:formattedProdutos});


});

router.get("/relatorio_produto/:filtro",async(req,res)=>{

  var{filtro} = req.params;

  if(filtro=='cre_valor'){

    const produtos = await Produto.findAll({order:[['preco','ASC']],include:{model:Estoque}});

    const formattedProdutos = produtos.map(produto => ({
      ...produto.dataValues,
      formattedDate: format(new Date(produto.createdAt), 'dd/MM/yyyy'),
    }));

    res.render('relatorios/produtos/rel_prod',{produtos:formattedProdutos});





  }
  else if(filtro == 'decre_valor'){

    const produtos = await Produto.findAll({order:[['preco','DESC']],include:{model:Estoque}});

    const formattedProdutos = produtos.map(produto => ({
      ...produto.dataValues,
      formattedDate: format(new Date(produto.createdAt), 'dd/MM/yyyy'),
    }));

    res.render('relatorios/produtos/rel_prod',{produtos:formattedProdutos});

  




  }
  else if(filtro == 'cre_data'){

    const produtos = await Produto.findAll({order:[['createdAt','ASC']],include:{model:Estoque}});

    const formattedProdutos = produtos.map(produto => ({
      ...produto.dataValues,
      formattedDate: format(new Date(produto.createdAt), 'dd/MM/yyyy'),
    }));

    res.render('relatorios/produtos/rel_prod',{produtos:formattedProdutos});

  

  }
  else if(filtro == 'decre_data'){

    const produtos = await Produto.findAll({order:[['createdAt','DESC']],include:{model:Estoque}});

    const formattedProdutos = produtos.map(produto => ({
      ...produto.dataValues,
      formattedDate: format(new Date(produto.createdAt), 'dd/MM/yyyy'),
    }));

    res.render('relatorios/produtos/rel_prod',{produtos:formattedProdutos});


  

  }
});


router.post("/relatorio_produto_dt",async (req,res)=>{
  

  //data final e data inicial capturadas 
  var data_inicial = req.body.data_inicial;
  var data_final = req.body.data_final;
  
  const produtos = await  Produto.findAll(
    {
      where:{createdAt:{[Sequelize.Op.between]:[new Date(data_inicial),
       new Date(data_final)]
      }
    },
    include:{model:Estoque}
  });

  const formattedProdutos = produtos.map(produto => ({
    ...produto.dataValues,
    formattedDate: format(new Date(produto.createdAt), 'dd/MM/yyyy'),
  }));

  res.render('relatorios/produtos/rel_prod',{produtos:formattedProdutos});

});




router.post("/relatorio_funcionarios_dt",async (req,res)=>{
  

  //data final e data inicial capturadas 
  var data_inicial = req.body.data_inicial;
  var data_final = req.body.data_final;
  
  const funcionarios = await  Funcionario.findAll(
    {
      where:{createdAt:{[Sequelize.Op.between]:[new Date(data_inicial),
       new Date(data_final)]
      }
    },
    include:{model:Cargo}
  });

  const formattedFuncionarios = funcionarios.map(produto => ({
    ...produto.dataValues,
    formattedDate: format(new Date(produto.createdAt), 'dd/MM/yyyy'),
  }));

  res.render('relatorios/funcionarios/rel_func',{funcionarios:formattedFuncionarios});

});

//seleção geral
router.get("/relatorio_funcionarios",async(req,res)=>{

  const funcionarios = await Funcionario.findAll({include:{model:Cargo}});

  const formattedFuncionarios = funcionarios.map(funcionario => ({
    ...funcionario.dataValues,
    formattedDate: format(new Date(funcionario.createdAt), 'dd/MM/yyyy'),
  }));
  res.render('relatorios/funcionarios/rel_func',{funcionarios:formattedFuncionarios});
   
});

//crescente por id
router.get("/relatorio_funcionarios/cres_id",async(req,res)=>{

  const funcionarios = await Funcionario.findAll({order:[['id','ASC']],include:{model:Cargo}});

  const formattedFuncionarios = funcionarios.map(funcionario => ({
    ...funcionario.dataValues,
    formattedDate: format(new Date(funcionario.createdAt), 'dd/MM/yyyy'),
  }));
  res.render('relatorios/funcionarios/rel_func',{funcionarios:formattedFuncionarios});
   
});

//decrescente por id
router.get("/relatorio_funcionarios/dec_id",async(req,res)=>{

  const funcionarios = await Funcionario.findAll({order:[['id','DESC']],include:{model:Cargo}});

  const formattedFuncionarios = funcionarios.map(funcionario => ({
    ...funcionario.dataValues,
    formattedDate: format(new Date(funcionario.createdAt), 'dd/MM/yyyy'),
  }));
  res.render('relatorios/funcionarios/rel_func',{funcionarios:formattedFuncionarios});
   
});



//crescente por data de cadastro

router.get("/relatorio_funcionarios/cres_dt",async(req,res)=>{

  const funcionarios = await Funcionario.findAll({order:[['createdAt','ASC']],include:{model:Cargo}});

  const formattedFuncionarios = funcionarios.map(funcionario => ({
    ...funcionario.dataValues,
    formattedDate: format(new Date(funcionario.createdAt), 'dd/MM/yyyy'),
  }));
  res.render('relatorios/funcionarios/rel_func',{funcionarios:formattedFuncionarios});
   
});

//descrescente por data 
router.get("/relatorio_funcionarios/dec_dt",async(req,res)=>{

  const funcionarios = await Funcionario.findAll({order:[['createdAt','DESC']],include:{model:Cargo}});

  const formattedFuncionarios = funcionarios.map(funcionario => ({
    ...funcionario.dataValues,
    formattedDate: format(new Date(funcionario.createdAt), 'dd/MM/yyyy'),
  }));
  res.render('relatorios/funcionarios/rel_func',{funcionarios:formattedFuncionarios});
   
});













    







module.exports = router;
