var redux = require('redux');

console.log('Starting redux example');

function changeProp(obj) {
  return {
    ...obj,
    name: 'Nas'
  }
}

let startingValue = {
  name: 'Denis',
  age: 35
};
let res = changeProp(startingValue);

console.log(startingValue);
console.log(res);
