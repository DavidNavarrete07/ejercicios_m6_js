const express = require('express');
const chalk = require('chalk');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
moment().locale('es').format('l');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const users = [];
app.get('/users', (req, res) => {
    for (let user of users) {
        console.log(chalk.underline.bold.bgWhite.blue(`Usuario: ${user.id} - ${user.firstName} ${user.lastName} - ${user.email} - ${user.timestamp}`));
    }
    res.json({users});
});

app.get('/new-user', async (req, res) => {
        try {
            const res_api = await axios.get('https://randomuser.me/api');
            let newUser = {
                id: uuidv4(),
                firstName: res_api.data.results[0].name.first,
                lastName: res_api.data.results[0].name.last,
                email: res_api.data.results[0].email,
                timestamp: moment().format('MMMM Do YYYY, h:mm:ss')
            }
            users.push(newUser);
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
});

app.get('*', (req, res) => {
    res.send('Página aún no implementada');
});

app.listen(3000, function () {
    console.log('servidor ejecutando correctamente');
});