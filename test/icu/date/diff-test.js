var addAll = require('../utils').addAll;
var test = require('../utils').test;

describe('ICU Date', function() {

    describe('Date short()', function() {
        var patterns = require('./icu3');
        addAll(patterns, function (locale, pattern) {
            test('Date short() ' + locale + ' => ' + pattern, locale, pattern);
        });
    });

    describe('Date narrow()', function() {
        var patterns = require('./icu2');
        addAll(patterns, function (locale, pattern) {
            test('Date narrow() ' + locale + ' => ' + pattern, locale, pattern);
        });
    });

    describe('Date medium()', function() {
        var patterns = require('./icu1');
        addAll(patterns, function (locale, pattern) {
            test('Date medium()' + locale + ' => ' + pattern, locale, pattern);
        });
    });

    describe('Date long()', function() {
        var patterns = require('./icu3');
        addAll(patterns, function (locale, pattern) {
            test('Date long() ' + locale + ' => ' + pattern, locale, pattern);
        });
    });

});