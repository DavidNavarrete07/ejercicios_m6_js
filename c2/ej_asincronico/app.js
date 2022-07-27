const axios = require('axios')
const fs = require('fs');

const name_file = process.argv[2];
const extension_file = process.argv[3];
const exchange_rate = process.argv[4];
const quantity = process.argv[5];

async function getData(){
    const res_api = await axios.get('https://mindicador.cl/api');
    const today = new Date();
    const value_type = res_api.data[exchange_rate].valor;

    const total = (quantity / value_type).toFixed(2);
    const phrase = `A la fecha: ${today} fue realizada cotización con los siguientes datos: 
    Cantidad de pesos a convertir: ${quantity} pesos
    Convertido a ${exchange_rate} da un total de: $${total}`;

    fs.writeFile(`${name_file}.${extension_file}`, phrase, 'utf-8', function(){
        setTimeout(() => {readMyFile()}, 2000);
    });
}
function readMyFile(){
    fs.readFile(`${name_file}.${extension_file}`, 'utf-8', function(err, result){
        console.log(result);
    });
}

getData();