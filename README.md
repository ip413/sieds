
[![codecov.io](https://codecov.io/gh/ip413/sieds/branch/master/graphs/badge.svg?branch=master)](https://codecov.io/gh/ip413/sieds/branch/master/graphs/badge.svg?branch=master)

# sieds - Simple Immutable Events Driven Store
Simple storage for blazing fast development.

## API

```js
set()  
get()  
addListener()  
removeListener() 
```

### set(value {Object})
Replace current state with obj.
```js
set({users: ['Tom', 'Katy']}
```

### set(key {String}, value {Mixed})
Replace property with provided value.
```js
set('users', ['Tom', 'Katy'])  
set("users[13]", 'Gordon')  
```

### get()
Returns current state

### get(key {String})
Returns current value of property.
```js
get('users[10]')
```

### addListener(key {String}, listener {Function})
Adds listener for specific keys on set function - not on data data change.
```js
addListener('users', () => {doSomething()});
```

### removeListener(key {String})
Removes all listeners for specific key.

### removeListener(listener {Function})
Removes provided function form any listning.

### removeListener(key {String}, listener {Function})
Removes provided function form any listning on specific key.


## Example

```js
var SimpleStore = require("simple-store"),  
    store = new SimpleStore({numbers: ['1', '2', '3']}),  
    state = store.get();  
state.numbers[0] = '8';          // { numbers: [ '8', '2', '3' ] }  
store.get();                     // { numbers: [ '1', '2', '3' ] }  
store.set('numbers[0]', '0'));   // { numbers: [ '0', '2', '3' ] }
```
```js
store.addListener('numbers[1]', (value) => {console.log("second number:", value)});  
store.set('numbers[1]', 6) // "second number: 6"
```
## Pitfalls
If you are listening on nested event like `users.europe.spain[34]` you can overlook change in this field, because it could have place during `set("users.europe.spain", [...]")`.  
You are listening on `set()` first argument - `key`, not on actual data change.

## License
MIT