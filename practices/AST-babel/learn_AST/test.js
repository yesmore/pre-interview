const parser = require('./index');
const input = '(add 20 (subtract 4 2))';
const output = 'add(20, subtract(4, 2))'

const tokens = parser(input)
console.log(tokens);