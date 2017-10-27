# intl-datetimeformat-pattern

Library to map CLDR Pattern/Skeleton to a valid `Intl.DateTimeFormat` options object.

Overview
--------

ECMA-402, the Javascript Internationalization Specification does not include a way to format a CLDR Pattern or Skeleton, which is a common features in other programming languages. The reason for this omition is that using a pattern requires the programmer to specify a localized pattern for each locale. That model does not work well for the Web because users will tripover easily by using the same pattern for all locales, which defeats the purposes of `Intl`. Instead, it expects a bag of options that represent the desired configuration for the output, e.g.:

```js
const options = {
    eekday: 'short',
    month: 'short',
    day: 'numeric',
    year: '2-digit'
};
const dt = new Intl.DateTimeFormat('en', options);
dt.format(Date.now()); // yields 'Fri, Oct 27, 17'
```

As a result, Javascript engines can decide what is the best possible output based on the provided locale, and the bag of options provided as the second argument for `Intl.DateTimeFormat` constructor. This complicates things if what you have is a pattern or skeleton from CLDR, and assuming that you, as a developer, know what you are doing, you should be able to rely on patterns to format your date values.

This Library
------------

This library provides a single function that when invoked with a string value representing the pattern or skeleton, returns the most likely options object that can be used as the option bag for `Intl.DateTimeFormat` constructor.

The translation process is based on CLDR's Date Field Symbol Table:

 * http://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table 

Examples
--------

```js
import patternToOptions from "intl-datetimeformat-pattern";
const options = patternToOptions("EEE, MMM d, ''yy");
const dt = new Intl.DateTimeFormat('en', options);
dt.format(Date.now()); // yields 'Fri, Oct 27, 17'
```

Cavets
------

The mapping process is loose, and for most cases, if the pattern or skeleton is described in CLDR/ICU, it is very likely that it produces the equivalent output. Other arbitrary patterns might result in different results, althought the result will probably preserve a similar set of components and settings that those described in the pattern.

Javascript engines will analyze the options derivated from the pattern, and will attempt to choose the best fit. Usually, that internal best-fit representation matches the original pattern, but this is implementation specific. Microsoft Internet Explorer and Edge do not use CLDR/ICU at the moment, which means they are more likely to differ from the rest of the browsers that are using ICU under the hood.

Contribute
---------

Check out the [Contributing document][CONTRIBUTING] for the details. Thanks!


License
-------

This software is free to use under the MIT license.
See the [LICENSE file][] for license text and copyright information.

[CONTRIBUTING]: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/CONTRIBUTING.md
[LICENSE file]: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/LICENSE