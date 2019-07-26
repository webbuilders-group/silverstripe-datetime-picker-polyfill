<?php
namespace WebbuildersGroup\DatetimePickerPolyfill\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class Polyfiller extends Extension
{
    /**
     * @TODO
     */
    public function onBeforeRender($context, $properties)
    {
        Requirements::javascript('webbuilders-group/silverstripe-datetime-picker-polyfill: javascript/polyfiller.js');
    }
}
