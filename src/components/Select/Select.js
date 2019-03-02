
// External Libraries
import React, {Component} from 'react';

// Internal Libraries
import './Select.css';

class Select extends Component {
    render() {
        let {value, onChange, name} = this.props; // Required Props
        let Options = [], defValue={
            value, onChange
        };
        Options.push(<option key={"Select:" + name + ":-1"} value={value} disabled hidden>{value}</option>);

        if ("disabled" in this.props) {
            defValue["disabled"] = this.props.disabled;
        }

        if ("options" in this.props) {
            let {options} = this.props;
            for (let i in options) {
                let option = options[i];
                let {Value, content} = option;
                Options.push(<option key={"Select:" + name + ":" + i} value={Value}>
                    {content}
                </option>);
            }
        }

        if ("values" in this.props) {
            let {values} = this.props;
            for (let i in values) {
                let option = values[i];
                let vals;
                if (option.includes(":")) {
                    vals = option.split(":");
                } else {
                    vals = [option, option];
                }

                Options.push(<option key={"Select:" + name + ":" + i} value={vals[0].trim()}>
                    {vals[1].trim()}
                </option>);
            }
        }

        return <select {...defValue}>{Options}</select>;
    }
}

export default Select;