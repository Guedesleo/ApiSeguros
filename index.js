const axios = require('axios');
const fs = require('fs');

async function marcas() {
	marcas =  await axios.get('https://veiculos-gateway-api.minutoseguros.com.br/marcas');
	return marcas.data.marcas;
}
async function marcasFabricação(marcas1) {
	 marcasfab =  await axios.get(`https://veiculos-gateway-api.minutoseguros.com.br/${item}/anos-modelo`);
	return marcasfab;
}

(async()=>{
   let marcasfab = await marcas();
   marcasfab.map(function(resposta){
     console.log(resposta.nome)
   })
})();







    
  // var marcasCarro = fs.createWriteStream('Marcas.txt');
  // const carroMarcas = marcas.map(function (item) {
  //   marcasCarro.write(item.codigo + ',\n');
  //   return item.codigo
  // });  

  // carroMarcas.map(function(item){
  //   axios.get(`https://veiculos-gateway-api.minutoseguros.com.br/${item}/anos-modelo`)
  //   .then(function (resposta) {
  //    let ano=[].concat(item,...resposta.data.anos)
  //    console.log(ano)
  //    var marcaAno = fs.createWriteStream('marcasFabricacao.txt');
  //    })
  //   });

  //   marcasCarro.end();
  //   ano.map(function (item) {
  //         console.log(`Nome do carro:${item.nome}   Ano de Fabricação:${item.ano} `);
  //       })
  //         wstream.end();
