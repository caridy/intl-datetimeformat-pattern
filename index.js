/**
 * Match datetime components in a CLDR pattern, except those in single quotes.
 * This regexp should match all possible fragments described in:
 * http://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table 
 */
var expDTComponents = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;


/**
 * Analayze individual segments of a CLDR pattern and matches it to
 * the corresponding datatime component option.
 */
function analyzeSkeltonSegment($0, formatObj) {
    switch ($0.charAt(0)) {
        // --- Era
        case 'G':
            formatObj.era = [ 'short', 'short', 'short', 'long', 'narrow' ][$0.length-1];
            break;

        // --- Year
        case 'y':
        case 'Y':
        case 'u':
        case 'U':
        case 'r':
            formatObj.year = $0.length === 2 ? '2-digit' : 'numeric';
            break;

        // --- Quarter (not supported in this polyfill)
        case 'Q':
        case 'q':
            formatObj.quarter = [ 'numeric', '2-digit', 'short', 'long', 'narrow' ][$0.length-1];
            break;

        // --- Month
        case 'M':
        case 'L':
            formatObj.month = [ 'numeric', '2-digit', 'short', 'long', 'narrow' ][$0.length-1];
            break;

        // --- Week (not supported in this polyfill)
        case 'w':
            // week of the year
            formatObj.week = $0.length === 2 ? '2-digit' : 'numeric';
            break;
        case 'W':
            // week of the month
            formatObj.week = 'numeric';
            break;

        // --- Day
        case 'd':
            // day of the month
            formatObj.day = $0.length === 2 ? '2-digit' : 'numeric';
            break;
        case 'D': // day of the year
        case 'F': // day of the week
        case 'g':
            // 1..n: Modified Julian day
            formatObj.day = 'numeric';
            break;

        // --- Week Day
        case 'E':
            // day of the week
            formatObj.weekday = [ 'short', 'short', 'short', 'long', 'narrow', 'short' ][$0.length-1];
            break;
        case 'e':
            // local day of the week
            formatObj.weekday = [ 'numeric', '2-digit', 'short', 'long', 'narrow', 'short' ][$0.length-1];
            break;
        case 'c':
            // stand alone local day of the week
            formatObj.weekday = [ 'numeric', undefined, 'short', 'long', 'narrow', 'short' ][$0.length-1];
            break;

        // --- Period
        case 'a': // AM, PM
        case 'b': // am, pm, noon, midnight
        case 'B': // flexible day periods
            formatObj.hour12 = true;
            break;

        // --- Hour
        case 'h':
            // 1, 12
            formatObj.hourCycle = "h12";
            formatObj.hour12 = true; // 12-hour-cycle time formats
            formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
            break;
        case 'H':
            // 0-23
            formatObj.hourCycle = "h23";
            formatObj.hour12 = false; // 23-hour-cycle time formats
            formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
            break;
        case 'k':
            // 1, 24
            formatObj.hourCycle = "h24";
            formatObj.hour12 = false; // 24-hour-cycle time formats
            formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
            break;
        case 'K':
            // 0, 11
            formatObj.hourCycle = "h11";
            formatObj.hour12 = true; // 11-hour-cycle time formats
            formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
            break;

        // --- Minute
        case 'm':
            formatObj.minute = $0.length === 2 ? '2-digit' : 'numeric';
            break;

        // --- Second
        case 's':
            formatObj.second = $0.length === 2 ? '2-digit' : 'numeric';
            break;
        case 'S':
        case 'A':
            formatObj.second = 'numeric';
            break;

        // --- Timezone
        case 'z': // 1..3, 4: specific non-location format
        case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
        case 'O': // 1, 4: miliseconds in day short, long
        case 'v': // 1, 4: generic non-location format
        case 'V': // 1, 2, 3, 4: time zone ID or city
        case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
        case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
            // this polyfill only supports much, for now, we are just doing something dummy
            formatObj.timeZoneName = $0.length < 4 ? 'short' : 'long';
            break;
    }
}

var cache = Object.create(null);

/**
 * Converts CLDR Pattern into a valid Intl.DateTimeFormat options object required by
 * the ECMAScript Internationalization API specification.
 */
module.exports = function getDateTimeFormatOptions(pattern) {
    if (typeof pattern !== 'string') {
        throw new TypeError();
    }
    var formatObj = cache[pattern];
    if (formatObj) {
        return formatObj;
    }
    formatObj = cache[pattern] = {};
    // Match the skeleton string with the one required by the specification
    // this implementation is based on the Date Field Symbol Table:
    // http://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
    pattern.replace(expDTComponents, function ($0) {
        // See which symbol we're dealing with
        analyzeSkeltonSegment($0, formatObj);
        return '';
    });
    return formatObj;
};
