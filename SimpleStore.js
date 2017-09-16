var _ = require("lodash");

function SimpleStore(initialState) {
    var currentState = initialState || {};
    var listeners = {};

    /**
     * Adds listener to specific store key.
     * @param {String} key
     * @param {Function} handler
     */
    SimpleStore.prototype.addListener = function addListener (key, handler) {
        if (!listeners.hasOwnProperty(key)) {
            listeners[key] = [];
        }
        listeners[key].push(handler);
    }

    /**
     * Removes listener, by key, reference, or key and reference.
     * 
     * @param {String}      key
     * or
     * @param {Function}    reference
     * or
     * @params {String}     key
     * @params {Function}   reference
     */
    SimpleStore.prototype.removeListener = function removeListener () {
        // Removing by key
        if (arguments.length === 1 && arguments[0].constructor === String) {
            delete listeners[arguments[0]];
            return;
        }

        // Removing by reference
        if (arguments.length === 1 && arguments[0].constructor === Function) {
            for (var key in listeners) {
                for (var i in listeners[key]) {
                    if (listeners[key][i] === arguments[0]) {
                        listeners[key].splice(i, 1);
                    }
                }
            }
            return;
        }

        // Removing by key and reference
        if (arguments.length === 2 && arguments[0].constructor === String && arguments[1].constructor === Function) {
            var key = arguments[0],
                listener = arguments[1];
            for (var i in listeners[key]) {
                if (listeners[key][i] === listener) {
                    listeners[key].splice(i, 1);
                }
            }
            return;
        }

        throw "Can't understand arguments. It should be key or listener or key and listener."
    }

    /**
     * Sets store state or modify its properties.
     * Returns new state.
     *
     * Arguments:
     * @param {Object}
     * or
     * @param {String}
     * @param {Mixed}
     */
    SimpleStore.prototype.set = function set() {
        if (arguments.length === 1 && arguments[0].constructor === Object) {
            return setState.apply(this, arguments);
        }

        if (arguments.length === 2 && arguments[0].constructor === String) {
            return setProperty.apply(this, arguments);
        }

        throw "Can't understand arguments. One object, or two arguments: state property key and value are required.";
    }

    /**
     * Returns state or property under key
     * @return {Object|Mixed}
     */
    SimpleStore.prototype.get = function get() {
        if (arguments.length === 0) {
            return cloneObject(currentState);
        }

        if (arguments.length === 1 && arguments[0].constructor === String) {
            return _.get(cloneObject(currentState), arguments[0]);
        }

        throw "Can't understand arguments. None or one string is required.";
    }

    function cloneObject(obj) {
        if ((obj).constructor === Object) {
            return JSON.parse(JSON.stringify(obj));
        } else {
            return obj;
        }
    }

    function setProperty(key, value) {
        currentState = cloneObject(currentState);
        _.set(currentState, key, cloneObject(value));
        callListeners(key);
        return cloneObject(currentState, cloneObject(value));
    }

    function callListeners(key, value) {
        if (listeners.hasOwnProperty(key)) {
            for (var handler in listeners[key]) {
                listeners[key][handler].call(this, value);
            }
        }
    }

    function setState(state) {
        currentState = cloneObject(state);
        return cloneObject(currentState);
    }

}

module.exports = SimpleStore;