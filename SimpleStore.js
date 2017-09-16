var _ = require("lodash");

function SimpleStore(initialState) {
    var currentState = initialState || {};

    /**
     * Sets store state or modify its properties.
     * Returns new state.
     *
     * Arguments:
     *     state    {Object}
     * or
     *     key      {String}
     *     value    {Mixed}
     */
    SimpleStore.prototype.set = function() {
        if (arguments.length === 1 && arguments[0].constructor === Object) {
            return setState.apply(this, arguments);
        }

        if (arguments.length === 2 && arguments[0].constructor === String) {
            return setProperty.apply(this, arguments);
        }

        throw "Can't understand arguments. It should be: one object as a state, or two arguments: state property key and value";
    }

    /**
     * Returns state or property under key
     * @return {Object|Mixed}
     */
    SimpleStore.prototype.get = function() {
        if (arguments.length === 0) {
            return cloneObject(currentState);
        }

        if (arguments.length === 1 && arguments[0].constructor === String) {
            return _.get(cloneObject(currentState), arguments[0]);
        }

        throw "Can't understand arguments. None or one string is required.";
    }

    function cloneObject(obj) {
        if (obj.constructor === Object) {
            return JSON.parse(JSON.stringify(obj));
        } else {
            return obj;
        }
    }

    function setProperty(key, value) {
        currentState = cloneObject(currentState);
        _.set(currentState, key, value);
        return cloneObject(currentState);
    }

    function setState(state) {
        currentState = cloneObject(state);
        return cloneObject(currentState);
    }

}

module.exports = SimpleStore;