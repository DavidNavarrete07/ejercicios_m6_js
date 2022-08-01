const express = require('express');
const fs = require('fs').promises;
const moment = require('moment');
moment().locale('es').format('l');

const app = express();
app.use(express.static('public'));
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));


app.post('/add', async (req, res) => {
  // típica estructura para obtener datos de un POST
  let str = '';
  req.on('data', function (parte) {
    str += parte;
  })
  req.on('end', function () {
    const form = JSON.parse(str);
    if (form.fileName != null || form.contentFile != null) {
      fs.writeFile('public/documents/' + form.fileName.trim() + '.txt', `${getDate()} \n ${form.contentFile.trim()}`, 'utf-8').then(() => {
        res.json(form);
      }).catch((err) => {
        console.log(err);
      });

    } else {
      res.send("Ingrese datos");
    }
  })
})


app.get('/read', async (req, res) => {
  const fileNameRead = req.query.fileNameRead;
  if (fileNameRead != null) {
    try {
      await fs.access('public/documents/' + fileNameRead + '.txt');
      let content = await fs.readFile('public/documents/' + fileNameRead + '.txt', 'utf-8');
      content.split("\n").join("<br>");
      res.send(
        `Archivo: ${fileNameRead}.txt,
        Contenido: ${content}`
      );
    } catch (error) {
      if (error.code === 'ENOENT') {
        res.send('El archivo no existe');
      } else {
        res.send('Error: ' + error);
      }
    }
  } else {
    res.send('Ingrese los datos');
  }
});



app.get('*', (req, res) => {
  res.send('Página aún no implementada')
});

app.listen(3000, function () {
  console.log('servidor ejecutando correctamente');
});

function getDate() {
  let day = moment().date();
  let month = moment().month() + 1;
  let year = moment().year();
  let date;
  (day < 10) ? day = '0' + day : day;
  (month < 10) ? month = '0' + month : month;
  date = `${day}/${month}/${year}`;
  return date;
}