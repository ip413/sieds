"use strict"
var SimpleStore = require("./Sieds"),
    tap = require('tap'),
    store;


tap.test("", function(t) {
    store = new SimpleStore();
    tap.equal(store.get() === store.get(), false, "should return another instance and the same value every time");;
    t.end();
});

tap.test("", function(t) {
    store = new SimpleStore({'a': 'a'});
    tap.strictSame(store.get(), {'a': 'a'}, "should initialize state in constructor");
    t.end();
});

tap.test("", function(t) {
    store = new SimpleStore();
    store.set({'b': 'b'});
    tap.strictSame(store.get(), {'b': 'b'}, "should set state by set");
    t.end();
});

tap.test("", function(t) {
    store.set({});
    store.set('b', 'b');
    tap.strictSame(store.get(), {'b': 'b'}, "should set simple key value property by set");
    t.end();
});

tap.test("", function(t) {
    store.set({});
    store.set('c', {c: 'c'});
    tap.strictSame(store.get(), {'c': {c: 'c'}}, "should set simple key reference property by set");
    t.end();
});

tap.test("", function(t) {
    store.set({c: 'c', d: 'd'});
    tap.equal(store.get('d'), 'd', "should return property for simple key");
    t.end();
});

tap.test("", function(t) {
    store.set({c: 'c', d: {e: ['e']}});
    tap.equal(store.get('d.e[0]'), 'e', "should return property for object key");
    t.end();
});

tap.test("", function(t) {
    store.set({c: 'c', d: {e: ['e']}});
    store.set('d.e[0]', 'f');
    tap.equal(store.get('d.e[0]'), 'f', "should set property for object key");
    t.end();
});

tap.test("", function(t) {
    var callbackCalled = 0,
        store = new SimpleStore();
    store.addListener('d', () => callbackCalled++)
    tap.equal(callbackCalled, 0, "shouldn't call listener");
    store.set('d', true);
    tap.equal(callbackCalled, 1, "should call listener once");
    store.set('d', true);
    tap.equal(callbackCalled, 2, "should call listener once");
    t.end();
});

tap.test("", function(t) {
    var callbackCalled = 0,
        store = new SimpleStore(),
        callback1 = () => callbackCalled++;
    store.addListener('d', callback1);
    store.addListener('d', callback1);
    store.set('d', true);
    tap.equal(callbackCalled, 1, "should call listener once");
    t.end();
});

tap.test("", function(t) {
    var store = new SimpleStore(),
        callback1Called = 0,
        callback2Called = 0,
        callback1 = () => callback1Called++,
        callback2 = () => callback2Called++;
    store.addListener('d', callback1);
    store.addListener('d', callback2);
    store.removeListener('d');
    store.set('d', true);
    tap.equal(callback1Called, 0, "should remove listener by key");
    tap.equal(callback2Called, 0, "should remove listener by key");
    t.end();
});

tap.test("", function(t) {
    var store = new SimpleStore(),
        callback1Called = 0,
        callback2Called = 0,
        callback1 = () => callback1Called++,
        callback2 = () => callback2Called++;
    store.addListener('d', callback1);
    store.addListener('d', callback2);
    store.removeListener(callback1);
    store.set('d', true);
    tap.equal(callback1Called, 0, "should remove listener by reference");
    tap.equal(callback2Called, 1, "shouldn't remove listener by reference");
    t.end();
});

tap.test("", function(t) {
    var store = new SimpleStore(),
        callback1Called = 0,
        callback2Called = 0,
        callback1 = () => callback1Called++,
        callback2 = () => callback2Called++;
    store.addListener('d', callback1);
    store.addListener('d', callback2);
    store.removeListener('d', callback1);
    store.set('d', true);
    tap.equal(callback1Called, 0, "should remove listener by key and reference");
    tap.equal(callback2Called, 1, "shouldn't remove listener by key and reference");
    tap.equal(callback2Called, 1, "shouldn't remove listener by reference");
    t.end();
});

tap.test("", function(t) {
    tap.strictSame(store.set({'c': 'c'}), store.get(), "should return the same state in set and followed get");;
    t.end();
});