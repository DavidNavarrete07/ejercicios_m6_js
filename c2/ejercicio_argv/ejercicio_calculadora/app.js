const arguments = process.argv.slice(2);

let num1 = Number(arguments[0]);
let num2 = Number(arguments[1]);

console.log(`Suma: ${num1 + num2}`);
console.log(`Resta: ${num1 - num2}`);
console.log(`Multiplicación: ${num1 * num2}`);
console.log(`División: ${num1 / num2}`);
