const express = require('express');
const fs = require('fs');
const moment = require('moment');
moment().locale('es').format('l');
const app = express();

const hostname = '127.0.0.1'
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/add', (req, res) => {
    if (req.query.fileName != null || req.query.contentFile != null) {
        fs.writeFile('public/documents/' + req.query.fileName.trim() + '.txt', `${getDate()} \n${req.query.contentFile.trim()}`, 'utf-8', function () {
            res.send(
                `<html>
                    <h2>Archivo creado con éxito</h2>
                    <h3>El archivo ${req.query.fileName.trim()}.txt se creó con éxito</h3>
                    <button onclick="window.location.href='/index.html'">Volver</button>
                </html>`
            );
        });
    } else {
        res.send(
            `<html>
                <h2>Ingrese los datos correspondientes</h2>
                <button onclick="window.location.href='/index.html'">Volver</button>
            </html>`
        );
    }
});

app.get('/read', (req, res) => {
    if (req.query.fileNameRead != null) {
        if (fs.existsSync('public/documents/' + req.query.fileNameRead.trim() + '.txt')) {
            fs.readFile('public/documents/' + req.query.fileNameRead.trim() + '.txt', 'utf-8', function (err, data) {
                let arr = data.trim().split("\n").join("<br>");
                res.send(
                    `<html>
                        <h4>Archivo: ${req.query.fileNameRead.trim()}.txt</h4>
                        <h4>Contenido del archivo: </h4>
                            <p>${arr}</p>
                        <button onclick="window.location.href='/index.html'">Volver</button>
                    </html>`
                );
            });
        } else {
            res.send(
                `<html>
                    <h2>El archivo no existe</h2>
                    <button onclick="window.location.href='/index.html'">Volver</button>
                </html>`
            );
        }
    } else {
        res.send(
            `<html>
                <h2>Ingrese los datos correspondientes</h2>
                <button onclick="window.location.href='/index.html'">Volver</button>
            </html>`
        );
    }
});

app.get('/rename', (req, res) => {
    if (req.query.fileNameRename != null || req.query.fileNameNew != null) {
        if (fs.existsSync('public/documents/' + req.query.fileNameRename.trim() + '.txt')) {
            fs.rename('public/documents/' + req.query.fileNameRename.trim() + '.txt', 'public/documents/' + req.query.fileNameNew.trim() + '.txt', function () {
                res.send(
                    `<html>
                        <h2>Archivo renombrado con éxito</h2>
                        <h3>El archivo ${req.query.fileNameRename.trim()}.txt se renombró con éxito
                         y su nuevo nombre es ${req.query.fileNameNew.trim()}.txt
                        </h3>
                        <button onclick="window.location.href='/index.html'">Volver</button>
                    </html>`
                );
            });
        } else {
            res.send(
                `<html>
                    <h2>El archivo no existe</h2>
                    <button onclick="window.location.href='/index.html'">Volver</button>
                </html>`
            );
        }
    } else {
        res.send(
            `<html>
                <h2>Ingrese los datos correspondientes</h2>
                <button onclick="window.location.href='/index.html'">Volver</button>
            </html>`
        );
    }
});

app.get('/confirm_delete', (req, res) => {
    res.send(
        `<html>
            <h4>Archivo eliminado: ${req.query.fileNameDelete.trim()}.txt</h4>
            <button onclick="window.location.href='/index.html'">Volver</button>
        </html>`
    );
});

app.get('/delete', (req, res) => {
    if (req.query.fileNameDelete != null) {
        if (fs.existsSync('public/documents/' + req.query.fileNameDelete.trim() + '.txt')) {
            fs.unlink('public/documents/' + req.query.fileNameDelete.trim() + '.txt', function () {
                res.send(
                    `<p>Tu Tu solicitud para eliminar el archivo ${req.query.fileNameDelete.trim()+'.txt'} se está procesando
                     <script>
                        setTimeout(function(){
                            window.location = '/confirm_delete?fileNameDelete=${req.query.fileNameDelete.trim()}'
                        }, 3000);
                     </script>
                    `);
            });
        } else {
            res.send(
                `<html>
                    <h2>El archivo no existe</h2>
                    <button onclick="window.location.href='/index.html'">Volver</button>
                </html>`
            );
        }
    } else {
        res.send(
            `<html>
                <h2>Ingrese los datos correspondientes</h2>
                <button onclick="window.location.href='/index.html'">Volver</button>
            </html>`
        );
    }
});


app.get('*', (req, res) => {
    res.send("Ruta no implementada");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
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