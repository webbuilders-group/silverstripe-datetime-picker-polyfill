DateTime Picker Polyfill
=================
Adds a polyfill for browsers that do not support the input type datetime-local to the DatetimeField form field

## Maintainer Contact
* Ed Chipman ([UndefinedOffset](https://github.com/UndefinedOffset))


## Requirements
* SilverStripe 4.4+
* SilverStripe Admin 1.4+

#### When used outside the SilverStripe Admin
* React ^16.11.0
* ReactDom ^16.11.0
* MomentJS
* ModernizerJS (with at least inputtypes)
* classnames ^2.2.6
* prop-types ^15.7.2


## Installation
```
composer require webbuilders-group/silverstripe-datetime-picker-polyfill
```

## Configuration
This module should apply itself to all instances of `SilverStripe\Forms\DatetimeField` out of the box so no configuration should be needed.
