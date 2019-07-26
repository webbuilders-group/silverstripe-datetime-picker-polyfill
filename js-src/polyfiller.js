import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import modernizr from 'modernizr';
import jQuery from 'jquery';
import DateMomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, InlineDateTimePicker } from "material-ui-pickers";


class DateTimeFieldPolyfill extends React.Component {
    render() {
        const initialValue = this.props.value;
        const handleChange = (...args) => this._handleChange(...args);
        
        return (
                <MuiPickersUtilsProvider utils={DateMomentUtils}>
                    <InlineDateTimePicker
                        keyboard
                        value={initialValue}
                        onChange={handleChange}
                        format="L LT"
                    />
                </MuiPickersUtilsProvider>
            );
    }
    
    _handleChange() {
        
    }
}


if (modernizr.inputtypes['datetime-local'] == false) {
    (function($) {
        $.entwine('ss', function($) {
            $('input[type=datetime-local]').entwine({
                onadd() {
                    ReactDOM.render(
                        <DateTimeFieldPolyfill value={this.val()}/>,
                        this.parent()[0]
                    );
                },
                
                updateValue() {
                    //Surpress core functionality
                }
            });
        });
    })(jQuery);
}
