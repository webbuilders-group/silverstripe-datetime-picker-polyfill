import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import modernizr from 'modernizr';
import jQuery from 'jquery';
import DateMomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, InlineDateTimePicker } from 'material-ui-pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {main: '#005A93'},
        secondary: {main: '#43C7F4'},
    },
    typography: {
        caption: {
            fontSize: '1rem',
        },
        body1: {
            fontSize: '1.175rem',
        },
    },
});

class DateTimeFieldPolyfill extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: this.props.value,
        };
    }
    
    render() {
        const initialValue = this.state.value;
        const handleChange = (...args) => this._handleChange(...args);
        
        const options = {
            value: (initialValue || null),
            onChange: handleChange,
            placeholder: 'Example: ' + moment().endOf('month').format('L LT'),
            format: 'L LT',
            clearable: true,
        };
        
        return (
                <MuiThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DateMomentUtils}>
                        <InlineDateTimePicker keyboard className="datetime-polyfiller" {...options}/>
                        <input type="hidden" name={this.props.name} value={this.state.value}/>
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            );
    }
    
    _handleChange(date) {
        this.setState({
            value: date.format('YYYY-MM-DDTHH:mm:ss'),
        });
    }
}


if (modernizr.inputtypes['datetime-local'] == false) {
    (function($) {
        $.entwine('ss', function($) {
            $('input[type=datetime-local]').entwine({
                onadd() {
                    ReactDOM.render(
                        <DateTimeFieldPolyfill value={this.val()} name={this.attr('name')}/>,
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
