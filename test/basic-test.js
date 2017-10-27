var expect = require('expect');
var getDateTimeFormatOptions = require('../');

describe('Basic', function() {

    describe('getDateTimeFormatOptions()', function() {
        it('should support empty string', function() {
            var o = getDateTimeFormatOptions('');
            expect(o).toMatchObject({});
        });
    });

    describe('getDateTimeFormatOptions()', function() {
        it('should cache results', function() {
            var a = getDateTimeFormatOptions("EEE, MMM d, ''yy");
            expect(a).toMatchObject({
                day: "numeric",
                month: "short",
                weekday: "short",
                year: "2-digit",
            });
        });
    });

    describe('getDateTimeFormatOptions()', function() {
        it('should cache results', function() {
            var a = getDateTimeFormatOptions("EEE, MMM d, ''yy");
            var b = getDateTimeFormatOptions("EEE, MMM d, ''yy");
            expect(a).toBe(b);
        });
    });

    describe('getDateTimeFormatOptions()', function() {
        it('should throw for non-string values', function() {
            expect(function () {
                get>DateTimeFormatOptions();
            }).toThrow();
        });
    });

});