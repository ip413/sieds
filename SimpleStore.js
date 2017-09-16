function SimpleStore(initialState) {
    var currentState = initialState || {};

    SimpleStore.prototype.set = function(state) {
        currentState = cloneObject(state);
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