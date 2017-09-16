function SimpleStore(initialState) {
    var currentState = {};

    SimpleStore.prototype.set = function(value) {
        return cloneObject(currentState);
    }

    SimpleStore.prototype.get = function() {
        return cloneObject(currentState);
    }

    function cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}

module.exports = SimpleStore;