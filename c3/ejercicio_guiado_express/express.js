const express = require('express');
const app = express();

const hostname = '127.0.0.1'
const port = 301;

let respuesta;

app.get('/', (request, response) => {
    response.send('<h1>Servicio caído</h1>');
});

app.get('/api', (request, response) => {
    respuesta = {
        fecha: new Date(),
        dolar: {
            indicador: 'Dolar EEUU',
            valor: 950
        },
        uf: {
            indicador: 'Unidad de Fomento',
            valor: 33450
        }
    }
    respuesta = JSON.stringify(respuesta);
    response.send(respuesta);
});

app.get('/api/dolar', (request, response) => {
    respuesta = {
        hoy: 950,
        ayer: 1000,
        anteayer: 'muy caro!'
    }
    respuesta = JSON.stringify(respuesta)
    response.send(respuesta);
});

// FALTA AXIOS
// app.get('/api/clima', async (request, response) => {
//     try {
//         const res_api = await axios.get('https://api.gael.cloud/general/public/clima/SCCH');
//         respuesta = JSON.stringify(res_api.data);
//     } catch (error) {
//         console.log(error);
//     }
//     response.send(respuesta);
// });

app.listen(port, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});