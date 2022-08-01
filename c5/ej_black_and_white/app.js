const express = require('express');
const jimp = require('jimp');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/img-black-white', async (req, res) => {
    const allowedExtensions = /(.jpg|.png)$/i;
    if (!allowedExtensions.exec(req.query.image)) {
        res.send('Solo se admiten formatos .jpg y .png')
    } else {
        if (req.query.image != null) {
            const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
            const image = await jimp.read(req.query.image);
            image.resize(350, 350)
                .greyscale()
                .quality(90)
                .print(font, 20, 20, 'Imagen modificada')
                .write('public/images/newImg.jpg');
            res.redirect('/images/newImg.jpg');
        } else {
            res.send('Ingrese los datos');
        }
    }
});

app.get('*', (req, res) => {
    res.send('Página aún no implementada')
});

app.listen(3000, function () {
    console.log('servidor ejecutando correctamente');
});