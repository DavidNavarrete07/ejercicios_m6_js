const express = require('express');
const fs = require('fs');
const app = express();

const hostname = '127.0.0.1'
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/add', (req, res) => {
    if (req.query.fileName.length != 0 || req.query.contentFile.length != 0) {
        fs.writeFile('public/documents/' + req.query.fileName.trim(), req.query.contentFile.trim(), 'utf-8', function () {
            res.send("Archivo creado con éxito");
        });
    }else{
        res.send("Ingrese los datos correspondientes");
    }
});

app.get('/read', (req, res) => {
    if (fs.existsSync('public/documents/' + req.query.fileNameRead.trim())) {
        fs.readFile('public/documents/' + req.query.fileNameRead.trim(), function (err, data) {
            res.send(data);
        });
    } else {
        res.send("Este archivo no existe");
    }
});

app.get('/rename', (req, res) => {
    fs.rename('public/documents/'+req.query.fileNameRename.trim(), 'public/documents/'+req.query.fileNameNew.trim(), function(){
        res.send("Archivo renombrado");
    });
});

app.get('/delete', (req, res) => {
    if(fs.existsSync('public/documents/'+req.query.fileNameDelete.trim())){
        fs.unlink('public/documents/' + req.query.fileNameDelete.trim(), function(){
            res.send("Archivo eliminado con éxito");
        });
    }else{
        res.send("El archivo no existe");
    }
});

app.get('*', (req, res) => {
    res.send("Ruta no implementada");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});