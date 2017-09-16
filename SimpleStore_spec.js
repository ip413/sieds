var failedTests = [],
    SimpleStore = require("./SimpleStore"),
    store,
    tests = 0;
{
    store = new SimpleStore();
    makeTest("should return another instance and the same value every time", store.get() === store.get(), false);
}

{
    store = new SimpleStore({'a': 'a'});
    makeTest("should initialize state in constructor", store.get(), {'a': 'a'});
}

{
    store = new SimpleStore();
    store.set({'b': 'b'});
    makeTest("should set state by set", store.get(), {'b': 'b'});
}

{
    store.set({});
    store.set('b', 'b');
    makeTest("should set simple key value property by set", store.get(), {'b': 'b'});
}

{
    store.set({});
    store.set('c', {c: 'c'});
    makeTest("should set simple key reference property by set", store.get(), {'c': {c: 'c'}});
}

{
    store.set({c: 'c', d: 'd'});
    makeTest("should return property for simple key", store.get('d'), 'd');
}

{
    store.set({c: 'c', d: {e: ['e']}});
    makeTest("should return property for object key", store.get('d.e[0]'), 'e');
}

{
    store.set({c: 'c', d: {e: ['e']}});
    store.set('d.e[0]', 'f');
    makeTest("should set property for object key", store.get('d.e[0]'), 'f');
}

{
    var callbackCalled = 0,
        store = new SimpleStore();
    store.addListener('d', () => callbackCalled++)
    makeTest("shouldn't call listener", callbackCalled, 0);
    store.set('d', true);
    makeTest("should call listener once", callbackCalled, 1);
    store.set('d', true);
    makeTest("should call listener once", callbackCalled, 2);
}

{
    var callbackCalled = 0,
        store = new SimpleStore(),
        callback1 = () => callbackCalled++;
    store.addListener('d', callback1);
    store.addListener('d', callback1);
    store.set('d', true);
    makeTest("should call listener once", callbackCalled, 1);
}

{
    var store = new SimpleStore(),
        callback1Called = 0;
        callback2Called = 0,
        callback1 = () => callback1Called++,
        callback2 = () => callback2Called++;
    store.addListener('d', callback1);
    store.addListener('d', callback2);
    store.removeListener('d');
    store.set('d', true);
    makeTest("should remove listener by key", callback1Called, 0);
    makeTest("should remove listener by key", callback2Called, 0);
}

{
    var store = new SimpleStore(),
        callback1Called = 0;
        callback2Called = 0,
        callback1 = () => callback1Called++,
        callback2 = () => callback2Called++;
    store.addListener('d', callback1);
    store.addListener('d', callback2);
    store.removeListener(callback1);
    store.set('d', true);
    makeTest("should remove listener by reference", callback1Called, 0);
    makeTest("shouldn't remove listener by reference", callback2Called, 1);
}

() => {
    var store = new SimpleStore(),
        callback1Called = 0;
        callback2Called = 0,
        callback1 = () => callback1Called++,
        callback2 = () => callback2Called++;
    store.addListener('d', callback1);
    store.addListener('d', callback2);
    store.removeListener('d', callback1);
    store.set('d', true);
    makeTest("should remove listener by key and reference", callback1Called, 0);
    makeTest("shouldn't remove listener by key and reference", callback2Called, 1);
}()

{
    makeTest("should return the same state in set and followed get", store.set({'c': 'c'}), store.get());
}

function makeTest(testName, has, exptected) {
    if (!areValuesEqual(has, exptected)) {
        failedTests.push([testName, has, exptected])
        console.log("test: ", testName, "FAILED!", "\n\t", "has: ", has, "\texpected: ", exptected);
    }
    tests++;
}

function areValuesEqual(value1, value2) {
    if ((value1 === undefined || value1 === null) && value1 !== value2) {
        return false;
    }
    if (value1.constructor === value2.constructor && (value1.constructor === Array || value1.constructor === Object)) {
        return JSON.stringify(value1) === JSON.stringify(value2);
    } else {
        return value1 === value2;
    }
}

console.log("\n\n----------------------------- \nSUMMARY")
if(failedTests.length > 0) {
    console.log('failed tests: ' + failedTests.length + '/' + tests + ' :')
    for (var test in failedTests) {
        console.log(failedTests[test]);
    }
} else {
    console.log('OK, all tests passed\n\n');
}