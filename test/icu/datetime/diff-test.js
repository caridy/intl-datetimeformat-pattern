var addAll = require('../utils').addAll;
var test = require('../utils').test;

describe('ICU DateTime', function() {

    describe('DateTime short()', function() {
        var patterns = require('./icu3');
        addAll(patterns, function (locale, pattern) {
            test('DateTime short() ' + locale + ' => ' + pattern, locale, pattern);
        });
    });

    describe('DateTime narrow()', function() {
        var patterns = require('./icu2');
        addAll(patterns, function (locale, pattern) {
            test('DateTime narrow() ' + locale + ' => ' + pattern, locale, pattern);
        });
    });

    describe('DateTime medium()', function() {
        var patterns = require('./icu1');
        addAll(patterns, function (locale, pattern) {
            test('DateTime medium() ' + locale + ' => ' + pattern, locale, pattern);
        });
    });

    describe('Time long()', function() {
        var patterns = require('./icu3');
        addAll(patterns, function (locale, pattern) {
            test('Time long() ' + locale + ' => ' + pattern, locale, pattern);
        });
    });

});