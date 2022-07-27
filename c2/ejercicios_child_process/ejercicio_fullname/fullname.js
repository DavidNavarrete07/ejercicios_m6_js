const child_process = require('child_process');

let name = null;
let lastname = null;

function execute(file){
    return new Promise((resolve) => {
        child_process.exec(`node ${file}`, function(err, result){
            resolve(result)
        });
    });
}

execute('name.js').then((nm) => {
    name = nm;
    execute('lastname.js').then((ln) => {
        lastname = ln;
        console.log(`${name}${lastname}`);
    })
});