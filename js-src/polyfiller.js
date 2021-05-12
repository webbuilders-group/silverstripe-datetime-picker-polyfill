import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import modernizr from 'modernizr';
import jQuery from 'jquery';
import DateMomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
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
            disabled: this.props.disabled,
            readOnly: this.props.readonly,
        };
    }
    
    render() {
        const initialValue = this.state.value;
        const handleChange = (...args) => this._handleChange(...args);
        
        const options = {
            value: (initialValue || null),
            onChange: handleChange,
            placeholder: 'Example: ' + moment().endOf('month').format((this.props.format ? this.props.format : 'MM/DD/YYYY h:mm a')),
            format: (this.props.format ? this.props.format : 'MM/DD/YYYY h:mm a'),
            clearable: true,
            disabled: this.state.disabled,
            readOnly: this.state.readonly,
        };
        
        if (this.props.max) {
            options.maxDate = this.props.max;
        }
        
        if (this.props.min) {
            options.minDate = this.props.min;
        }
        
        const className = 'datetime-polyfiller' + (this.state.disabled ? ' disabled' : '') + (this.state.readonly ? ' readonly' : '');
        
        return (
                <MuiThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DateMomentUtils}>
                        <KeyboardDateTimePicker variant="inline" className={className} {...options}/>
                        <input type="hidden" name={this.props.name} value={this.state.value}/>
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            );
    }
    
    componentDidMount() {
        var domNode = ReactDOM.findDOMNode(this);
        if (domNode) {
            jQuery(domNode.parentNode)
                .on('setValue.datetime-polyfiller', (e, data) => this._setValueFromExternal(e, data))
                .on('setDisabled.datetime-polyfiller', (e, data) => this._setDisabledFromExternal(e, data))
                .on('setReadonly.datetime-polyfiller', (e, data) => this._setReadonlyFromExternal(e, data));
        }
    }
    
    _handleChange(date) {
        this.setState({
            value: (date ? date.format('YYYY-MM-DDTHH:mm:ss') : ''),
        });
        
        const hiddenInput = jQuery('input[name=' + this.props.name + ']:hidden');
        hiddenInput.trigger('change');
        hiddenInput.parent().find('input[type=text]').trigger('change');
    }
    
    _setValueFromExternal(e, data) {
        this.setState({
            value: data.value,
            disabled: this.state.disabled,
            readonly: this.state.readonly,
        });
    }
    
    _setDisabledFromExternal(e, data) {
        this.setState({
            value: this.state.value,
            disabled: data.value,
            readonly: this.state.readonly,
        });
    }
    
    _setReadonlyFromExternal(e, data) {
        this.setState({
            value: this.state.value,
            disabled: this.state.disabled,
            readonly: data.value,
        });
    }
}


if (modernizr.inputtypes['datetime-local'] == false) {
    (function($) {
        $.entwine('ss', function($) {
            $('input[type=datetime-local]:not([readonly])').entwine({
                onadd() {
                    var wrapper = document.createElement('div');
                    this.parent()[0].replaceChild(wrapper, this[0]);
                    
                    ReactDOM.render(
                        <DateTimeFieldPolyfill id={this.attr('id')} value={this.val()} name={this.attr('name')} min={this.attr('min')} max={this.attr('max')} disabled={this.prop('disabled')} readonly={this.prop('readonly')} format={this.attr('data-date-format')}/>,
                        wrapper
                    );
                },
                
                updateValue() {
                    //Surpress core functionality
                }
            });
        });
    })(jQuery);
}
