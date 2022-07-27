const child_process = require('child_process');

let num1 = null;
let num2 = null;

function execute(file){
    return new Promise((resolve) => {
        child_process.exec(`node ${file}`, function(err, result){
            resolve(Number(result));
        });
    });
}

execute('firstNumber.js').then((numero1) => {
    num1 = numero1;
    execute('secondNumber.js').then((numero2) => {
        num2 = numero2;
        console.log(num1 + num2);
    });
});