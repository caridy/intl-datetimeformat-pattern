var addAll = require('../utils').addAll;
var test = require('../utils').test;

describe('ICU Time', function() {

    describe('Time short()', function() {
        var patterns = require('./icu3');
        addAll(patterns, function (locale, pattern) {
            test('Time short() ' + locale + ' => ' + pattern, locale, pattern);
        });
    });

    describe('Time narrow()', function() {
        var patterns = require('./icu2');
        addAll(patterns, function (locale, pattern) {
            test('Time narrow() ' + locale + ' => ' + pattern, locale, pattern);
        });
    });

    describe('Time medium()', function() {
        var patterns = require('./icu1');
        addAll(patterns, function (locale, pattern) {
            test('Time medium() ' + locale + ' => ' + pattern, locale, pattern);
        });
    });

    describe('Time long()', function() {
        var patterns = require('./icu3');
        addAll(patterns, function (locale, pattern) {
            test('Time long() ' + locale + ' => ' + pattern, locale, pattern);
        });
    });

});