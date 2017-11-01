var expect = require('expect');
var getDateTimeFormatOptions = require('../../');
var moment = require('moment');
var d = new Date(1979, 3, 15, 15, 30, 59, 999);
var explictLocales = undefined;

var Globalize = require( "globalize" );
Globalize.load( require( "cldr-data" ).all() );
Globalize.loadTimeZone( require( "iana-tz-data" ) );

module.exports.addAll = function (patterns, callback) {
    Object.keys(explictLocales || patterns).forEach(function (locale) {
        var pattern = patterns[locale];
        locale = locale.replace(/_/g, '-');
        var supported = true;
        try {
            if (Intl.DateTimeFormat(locale).resolvedOptions().locale !== locale) {
                throw RangeError('Invalid locale=' + locale);
            }
        } catch (ignoredLocaleNotSupportedInIntl) {
            supported = false;
            console.warn('Skipping locale=' + locale + ' because it is not supported in Intl');
        }
        try { Globalize(locale).formatDate(d); } catch (ignoredLocaleNotSupportedInGlobalize) {
            supported = false;
            console.warn('Skipping locale=' + locale + ' because it is not supported in Globalize');
        }
        if (supported) {
            callback(locale, pattern);
        }
    });
};

module.exports.test = function (name, locale, pattern) {
    it(name, function() {
        var o = getDateTimeFormatOptions(pattern);
        // forcing gregorian calendar for Intl to avoid mismatches because of the auto calendar selection
        var i = new Intl.DateTimeFormat(locale + '-u-ca-gregory', o).format(d);
        moment.locale(locale);
        var m = moment(d).format(pattern);
        var m = Globalize(locale).formatDate(d, { raw: pattern });
        expect(i).toMatch(m);
    });
};