var failedTests = [],
    tests = 0,
    SimpleStore = require("./SimpleStore"),
    store;

store = new SimpleStore();
makeTest("should return another instance and the same value every time", store.get() === store.get(), false);

store = new SimpleStore({'a': 'a'});
makeTest("should initialize state in constructor", store.get(), {'a': 'a'});

store = new SimpleStore();
store.set({'b': 'b'});
makeTest("3", store.get(), {'a': 'a'});

function makeTest(testName, has, exptected) {
    if (!areValuesEqual(has, exptected)) {
        failedTests.push([testName, has, exptected])
        console.log("test", testName, "FAILED!", "\n\t", "has: ", has, "\texpected: ", exptected);
    }
    tests++;
}

function areValuesEqual(value1, value2) {
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