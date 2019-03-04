
// External Libraries
import React, {Component} from 'react';

// Internal Components and CSS
import './Config.css';
import Appbar from '../../components/Appbar/Appbar';
import Menu from '../../components/Menu/Menu';
import Entries from '../../containers/Entries/Entries';
import Bottombar from '../../components/Bottombar/Bottombar';
import FloatingControls from '../../components/FloatingControls/FloatingControls';
import Modal from '../../components/Modal/Modal';

// Database Functions
import {getDepartmentName, getSubjectName} from '../../database/controller';

// [name, CO, PO, max]
let placeholder = ",Select CO,Select PO,";
let placeholders = [placeholder, placeholder];

class Config extends Component {
    state={
        current: "", 
        options: {},
        visible: false,
        newName: "",
        department: "",
        subject: ""
    }

    componentDidMount() {
        let paths = this.props.location.pathname.split("/");
        let details = paths[1].split("_");
        let department = details[0];
        let subject = details[3];
        getDepartmentName(department, res => this.setState({department: res}), err => console.log(err));
        getSubjectName(subject, res => this.setState({subject: res}), err => console.log(err));
    }

    addCommand = () => {
        let newName = this.state.newName,
        options = {...this.state.options};
        options[newName] = placeholders;
        this.setState({options, visible: false, newName: ""});
    }

    removeTest = () => {
        let options = {...this.state.options};
        delete options[this.state.current];
        this.setState({options});
    }

    render() {
        let {current, options, visible, newName, department, subject} = this.state;
        let paths = this.props.location.pathname.split("/");
        let details = paths[1].split("_");
        let Class = details[1];
        let section = details[2];

        return <div className="Config">
            <Modal visible={visible} closeModal={() => this.setState({visible: false})}>
                <div className="Config-Modal">
                    <p>Please enter a short unique name for the test/exam you are adding</p>
                    <input 
                        type="text"
                        placeholder="(Ex: test 2, Lab, App)"
                        value={newName}
                        onChange={e => this.setState({newName: e.target.value})}
                    />
                    <div>
                        <button 
                            disabled={newName===""} 
                            className="Config-Modal-Ok"
                            onClick={this.addCommand}>
                            Add
                        </button>
                        <button 
                            className="Config-Modal-Cancel"
                            onClick={() => this.setState({visible: false})}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            <Appbar title="Complete Configuration"/>
            <h2>Department of {department}</h2>
            <div className="Config-Details">
                <h4>Subject: {subject}</h4>
                <h4>Class: {Class}</h4>
                <h4>Section: {section}</h4>
            </div>
            <Menu 
                current={current}
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
                removeTest={this.removeTest}
            />
            <FloatingControls onClick={() => this.setState({visible: true})} />
            <Bottombar 
                options={[{
                    value: "Back",
                    onClick: () => this.props.history.goBack()
                },{
                    value: "Next",
                    onClick: () => console.log("onClick tapped")
                }]}
            />
        </div>;
    }
}

export default Config;