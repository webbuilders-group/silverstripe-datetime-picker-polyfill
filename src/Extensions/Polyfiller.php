<?php
namespace WebbuildersGroup\DatetimePickerPolyfill\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class Polyfiller extends Extension
{
    /**
     * Add the requirements used to polyfill in unsupported browsers
     * @param array $context
     * @param array $properties
     */
    public function onBeforeRender($context, $properties)
    {
        Requirements::css('webbuilders-group/silverstripe-datetime-picker-polyfill: css/polyfiller.css');
        Requirements::javascript('webbuilders-group/silverstripe-datetime-picker-polyfill: javascript/polyfiller.js');
    }
}
