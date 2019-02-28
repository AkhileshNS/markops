
// External Libraries
import React, {Component} from 'react';

// Internal Libraries
import './Config.css';
import Appbar from '../../components/Appbar/Appbar';
import Menu from '../../components/Menu/Menu';
import Entries from '../../components/Entries/Entries';

class Config extends Component {
    render() {
        return <div className="Config">
            <Appbar title="Complete Configuration"/>
            <h2>Department of Information Science and Engineering</h2>
            <h4>Course: Client and Server Programming   Class: III  Section: A</h4>
            <Menu 
                addCommand={() => console.log("Command Added")} 
                onCommandSelected={command => console.log(`${command} selected`)}
                options={["test 1", "test 2", "test 3", "lab", "app"]}
            />
            <Entries />
        </div>;
    }
}

export default Config;