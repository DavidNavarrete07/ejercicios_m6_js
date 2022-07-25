const http = require('http')
const moment = require('moment');

const hostname = '127.0.0.1'
const port = 3000
const chinese_horoscope = ['Rata', 'Bufalo', 'Tigre', 'Conejo', 'Mono', 'Cabra', 'Dragon', 'Serpiente', 'Caballo', 'Gallo', 'Perro', 'Cerdo'];

function randomElement(array){
    return array[Math.floor(Math.random() * array.length)];
}

const server = http.createServer((req, res) => {
  const day = moment().locale('es').format('dddd');
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(`<h2>Tu animal chino es: ${randomElement(chinese_horoscope)} y hoy es: ${day}</h2>`)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})