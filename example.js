"use strict"
var SimpleStore = require("./Sieds"),
    store = new SimpleStore({numbers: ['1', '2', '3']}),
    state = store.get();
state.numbers[0] = '8';
console.log(store.get()); // { numbers: [ '1', '2', '3' ] }
console.log(store.set('numbers[0]', '0')); // { numbers: [ '0', '2', '3' ] }

store.addListener('numbers[1]', (value) => {console.log("second number:", value)});
store.set('numbers[1]', 6) // console: second number: 6