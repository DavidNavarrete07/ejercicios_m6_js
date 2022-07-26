const http = require('http')
const fs = require('fs/promises')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer(async function (req, res)  { 
    const arrayPhrases = await fs.readFile('phrases.txt', 'utf8');
    const myArray = arrayPhrases.split("\n");
    let phrase = myArray[Math.floor(Math.random() * myArray.length)];
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(`<h1>${phrase}</h1>`)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})