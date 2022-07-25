const fs = require('fs');
const fs_p = require('fs/promises')
const list = 'Aceite\nTallarines\nNuggets\nLechuga\nPollo\n';

// sin promesas
// fs.writeFile('shopping.js', list, 'utf8', function(){
//    console.log("Archivo creado");
//        setTimeout(() => fs.readFile('./shopping.js', 'utf8', function(err, datos){
//        console.log(datos);
//             setTimeout(() => fs.rename('shopping.js', 'shopping_list.js', function(){
//             console.log("Archivo renombrado");
//                 setTimeout(() => fs.unlink('shopping_list.js', function(){
//                 console.log("Archivo eliminado");
//                 }), 2000)
//             }), 200)
//         }), 2000) 
// });

// Modificación de archivos con promesas
fs_p.writeFile('./promesa.txt', 'Archivo de texto creado con promesas')
.then(() => {
    console.log('El archivo de texto fue creado empleando promesas')
        setTimeout(() => fs_p.readFile('./promesa.txt', 'utf8').then((data) => {
        console.log(data);
            setTimeout(() => fs_p.rename('./promesa.txt', 'promesa.js').then(() => {
            console.log("Archivo renombrado");
                    setTimeout(() => fs_p.unlink('./promesa.js').then(() => {
                    console.log("Archivo eliminado");
                    }), 2000)
            }), 2000)
    }), 2000)
})
.catch(error => {
        console.log(error)
});