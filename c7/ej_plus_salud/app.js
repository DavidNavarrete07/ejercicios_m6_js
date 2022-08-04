const express = require('express');
const chalk = require('chalk');
const axios = require('axios');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
moment().locale('es').format('l');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB = {
    async createUser(newUser) {
        let fileDB = await fs.readFile('db/db.json', 'utf-8');
        fileDB = JSON.parse(fileDB);
        fileDB.users.push(newUser);
        fileDB = JSON.stringify(fileDB);
        await fs.writeFile('db/db.json', fileDB, 'utf-8');
    },
    async getUsers() {
        let fileDB = await fs.readFile('db/db.json', 'utf-8');
        fileDB = JSON.parse(fileDB);
        return fileDB.users;
    }
}

// Rutas
app.get('/users', async (req, res) => {
    for (let user of await DB.getUsers()) {
        console.log(chalk.underline.bold.bgWhite.blue(`Usuario: ${user.id} - ${user.firstName} ${user.lastName} - ${user.email} - ${user.timestamp}`));
    }
    const users = await DB.getUsers()
    res.json({ users });
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
        await DB.createUser(newUser);
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