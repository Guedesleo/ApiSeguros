const axios = require('axios');
const fs = require('fs');

async function marcas() {
  marcas = await axios.get('https://veiculos-gateway-api.minutoseguros.com.br/marcas');
  return marcas.data.marcas;
}
async function marcasFabricacao(marcas1) {
  marcasfab = await axios.get(`https://veiculos-gateway-api.minutoseguros.com.br/${marcas1}/anos-modelo`);
  return marcasfab.data.anos
}

async function modelos(marcas, anoFabricacao) {
  modelo = await axios.get(`https://veiculos-gateway-api.minutoseguros.com.br/${marcas}/${anoFabricacao}/modelos`);
  return modelo.data.modelos
}
async function versoes(marcas, anoFabricacao,modelo) {
  versoesCar = await axios.get(`https://veiculos-gateway-api.minutoseguros.com.br/${marcas}/${anoFabricacao}/${modelo}/versoes`);
  return versoesCar.data.versoes
}

(async () => {

  let marcasFabricacao1 = []
  let modeloCar = []
  let marcasCar = []
  let versoesCarros = []
  let marcasCar1 = await marcas();
  for (var j = 0; j < marcasCar1.length; j++) {
    for (var i = 0; i < marcasCar1[j].length; i++) {
      var obj = { nome:marcasCar1[j][i].nome , codigo: marcasCar1[j][i].codigo }
      marcasCar.push(obj)
    }
  }
  var marcasCarro = fs.createWriteStream('Marcas.csv');
  marcasCarro.write('Marcas , Codigo' + '\n')
  marcasCar.map(function (item) {
    marcasCarro.write(item.nome +','+item.codigo+ ',\n');
  })
  marcasCarro.end();

   for (var i = 0; i < marcasCar.length; i++) {
     await marcasFabricacao(marcasCar[i].codigo)
     var marcasFab = [].concat(marcasCar[i], marcasfab.data.anos)
     marcasFab.map(function (item) {
       if (item.ano != null) {
         var obj2 = { codigo_marcas: marcasCar[i].codigo, ano: item.ano }
         marcasFabricacao1.push(obj2)
       }
     })
   }
    var marcasCarFab = fs.createWriteStream('marcasFabricacao.csv');
    marcasCarFab.write('Marcas , AnoFabricação' + '\n')
    marcasFabricacao1.map(function (item) {
      if (item.ano != 2021) {
        marcasCarFab.write(item.codigo_marcas + ',' + item.ano + ',\n');
      }
  })
  marcasCarFab.end();
   var anofabricacaomodelo = fs.createWriteStream('anofabricacaomodelo.csv');
   anofabricacaomodelo.write('Marcas , AnoFabricação, Anomodelo, AnoModelo1' + '\n')
   marcasFabricacao1.map(async function (item) {
     if (item.ano != 2021) {
       anoMod = item.ano + 1
       anofabricacaomodelo.write(item.codigo_marcas + ',' + item.ano + ',' + anoMod + ',' + item.ano + ',\n');
     }
   })
   
  anofabricacaomodelo.end();

  for (var i = 0; i < marcasFabricacao1.length; i++) {
    if (marcasFabricacao1[i].ano != 2021) {
      await modelos(marcasFabricacao1[i].codigo_marcas, marcasFabricacao1[i].ano)
      var modelosCar = [].concat(marcasFabricacao1[i], modelo.data.modelos)
      modelosCar.map(function (item) {
        if (item.modelo != null) {
          var obj3 = { nome: marcasFabricacao1[i].codigo_marcas, ano: marcasFabricacao1[i].ano, modelo: item.modelo }
          modeloCar.push(obj3)
        } else {
          var obj4 = { nome: marcasFabricacao1[i].codigo_marcas, ano: marcasFabricacao1[i].ano, modelo: ',' }
          modeloCar.push(obj4)
        }
      })
    }
  }
   var modeloCarros = fs.createWriteStream('Modelos.csv');
   modeloCarros.write('Marcas , AnoFabricação, Anomodelo, AnoModelo1 , Modelo' + '\n')
   modeloCar.map(function (item) {
     anoMod=item.ano+1
     modeloCarros.write(item.nome+ ',' + item.ano+ ',' +anoMod+ ',' +item.ano + ',' +item.modelo+ '\n')
   })

  for (var i = 0; i < modeloCar.length; i++) {

      await versoes(modeloCar[i].nome, modeloCar[i].ano,modeloCar[i].modelo)
  
    var versoesCarro = [].concat(modeloCar[i], versoesCar.data.versoes)
    versoesCarro.map(function (item) {

      if (item.versao != null){
       var obj5 = {nome:modeloCar[i].nome,ano:modeloCar[i].ano,moedlo:modeloCar[i].modelo,versão:item.versao , codigFipe:item.codigoFipe}
       versoesCarros.push(obj5)
      }
    })

  }
  console.log(versoesCarros)

  modeloCarros.end();
  // versoes_Carros.end();
})();
