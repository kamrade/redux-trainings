var redux = require('redux');

console.log('Starting redux example');

function changeProp (obj) {
    return {
        ...obj,
        name: 'Jen'
    }
}

var res = changeProp({
    name: 'Andrew',
    age: 25
});

console.log(res);
