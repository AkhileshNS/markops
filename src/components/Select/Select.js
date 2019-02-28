
// External Libraries
import React, {Component} from 'react';

// Internal Libraries
import './Select.css';

class Select extends Component {
    render() {
        let {value, onChange} = this.props; // Required Props
        let Options = [], defValue={
            value, onChange
        };
        Options.push(<option key={value} value={value} disabled hidden>{value}</option>);

        if ("disabled" in this.props) {
            defValue["disabled"] = this.props.disabled;
        }

        if ("options" in this.props) {
            let {options} = this.props;
            for (let option of options) {
                let {value, content} = option;
                Options.push(<option key={value} value={value}>
                    {content}
                </option>);
            }
        }

        if ("values" in this.props) {
            let {values} = this.props;
            for (let option of values) {
                let vals;
                if (option.includes(":")) {
                    vals = option.split(":");
                } else {
                    vals = [option, option];
                }

                Options.push(<option key={vals[0].trim()} value={vals[0].trim()}>
                    {vals[1].trim()}
                </option>);
            }
        }

        return <select {...defValue}>{Options}</select>;
    }
}

export default Select;