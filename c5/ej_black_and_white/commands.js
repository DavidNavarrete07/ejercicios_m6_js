const yargs = require('yargs');
const chalk = require('chalk');

const argv = yargs.command('ping', `recibe un número, y devuelve ese número de PONG's`,
    {
        number: {
            describe: 'Para definir el número',
            demand: true,
            alias: 'n'
        }
    },
    function (args) {
        if (args.number) {
            if (args.number > 1) {
                for (let i = 0; i < args.number; i++) {
                    console.log(randomColor().underline.bold('PONG'));
                }
            } else {
                console.log('Ingrese un número mayor a 1');
            }
        } else {
            console.log('Ingrese el número');
        }
    }
).help().argv;

function randomColor() {
    return chalk.rgb(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
}

