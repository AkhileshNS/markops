
// External Libraries
import React, {Component} from 'react';

// Internal Libraries
import './Config.css';
import Appbar from '../../components/Appbar/Appbar';
import Menu from '../../components/Menu/Menu';
import Entries from '../../containers/Entries/Entries';

// [name, CO, PO, max]
let placeholder = ",Select CO,Select PO,";
let placeholders = [placeholder, placeholder];

class Config extends Component {
    state={
        current: "", 
        options: {
            "test 1": placeholders, 
            "test 2": placeholders, 
            "test 3": placeholders, 
            "lab": placeholders, 
            "app": placeholders
        }
    }

    render() {
        let {current, options} = this.state;

        return <div className="Config">
            <Appbar title="Complete Configuration"/>
            <h2>Department of Information Science and Engineering</h2>
            <h4>Course: Client and Server Programming   Class: III  Section: A</h4>
            <Menu 
                current={current}
                addCommand={() => console.log("Command Added")} 
                onCommandSelected={command => this.setState({current: command})}
                options={Object.keys(options)}
            />
            <Entries
                entries={(current in options ? options[current] : null)}
                onChange={entries => {
                    let Options = {...options};
                    Options[current] = entries;
                    this.setState({options: Options});
                }}
            />
        </div>;
    }
}

export default Config;