const express = require('express');
const yargs = require('yargs');
const chalk = require('chalk');
const jimp = require('jimp');
const axios = require('axios');
const moment = require('moment');
moment().locale('es').format('l');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const key = 123;

app.get('/img-black-white', async (req, res) => {
    console.log(chalk.underline.bold.white(`Lat: ${req.query.latitude}, Long: ${req.query.longitude}`));
    const allowedExtensions = /(.jpg|.png)$/i;
    if (!allowedExtensions.exec(req.query.image)) {
        res.send('Solo se admiten formatos .jpg y .png')
    } else {
        if (req.query.image != null) {
            const font = await jimp.loadFont(jimp.FONT_SANS_12_BLACK);
            const image = await jimp.read(req.query.image);
            image.resize(350, 350)
                .greyscale()
                .quality(90)
                .print(font, 10, 10, `${moment().format('MMMM Do YYYY, h:mm:ss')}`)
                .print(font, 10, 30, `${await getRandomPhrase()}`)
                .write('public/images/newImg.jpg');
            res.redirect('/images/newImg.jpg');
        } else {
            res.send('Ingrese los datos');
        }
    }
});

app.get('*', (req, res) => {
    res.send('Página aún no implementada');
});

async function getRandomPhrase() {
    let randomNum = Math.floor(Math.random() * (80 - 1));
    let phrase;
    try {
        const res_api = await axios.get(`https://anapioficeandfire.com/api/houses/${randomNum}`);
        console.log(JSON.stringify(res_api.data.coatOfArms));
        phrase = JSON.stringify(res_api.data.coatOfArms);
        if (phrase === "" || phrase === null) {
            phrase = 'Sin frase';
        }
    } catch (error) {
        console.log(error);
    }
    return phrase;
}

const argv = yargs.command('serverUp', 'Levantar el servidor',
    {
        key: {
            describe: 'Contraseña para levantar el servidor',
            demand: true,
            alias: 'k'
        }
    },
    function (args) {
        if (args.key === key) {
            app.listen(3000, function () {
                console.log('servidor ejecutando correctamente');
            });
        } else {
            console.log('La contraseña ingresada no es correcta');
        }
    }
).help().argv;