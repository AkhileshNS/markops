
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
import Table from '../../components/Table/Table';
import Loading from '../../components/Loading/Loading';

// Database Functions
import {
    getDepartmentName, 
    getSubjectName, 
    getTableConfig, 
    setTableConfig
} from '../../database/controller';
import {validateOptions, constructTable} from './functions';

// [name, CO, PO, max]
let placeholder = ":::";
let placeholders = [placeholder, placeholder];

class Config extends Component {
    state={
        current: "", 
        options: {},
        visible_add: false,
        visible_table: false,
        newName: "",
        department: "",
        subject: "",
        table: null,
        loadingOptions: {
            open: true,
            message: "Getting Configuration...",
            error: null
        }
    }

    componentDidMount() {
        let paths = this.props.location.pathname.split("/");
        let details = paths[1].split("_");
        let department = details[0];
        let subject = details[3];
        getDepartmentName(department, res => this.setState({department: res}), err => console.log(err));
        getSubjectName(subject, res => this.setState({subject: res}), err => console.log(err));

        getTableConfig(this.props.location.pathname, res => {
            this.setState({options: res, loadingOptions: {open: false, message: null, error: null}});
        }, (err, err_code) => {
            if (err_code===2) {
                console.log(err);
            } 
        });
    }

    addCommand = () => {
        let newName = this.state.newName,
        options = {...this.state.options};
        options[newName] = placeholders;
        this.setState({options, visible_add: false, newName: ""});
    }

    removeTest = () => {
        let options = {...this.state.options};
        delete options[this.state.current];
        this.setState({options});
    }

    next = () => {
        setTableConfig(this.props.location.pathname, this.state.options, () => {
            this.props.history.push(this.props.location.pathname + "/marks_input");
        }, err => console.log(err));
    }

    showTable = () => {
        this.setState({table: constructTable(this.state.options)}, () => {
            console.log(this.state.table);
            this.setState({visible_table: true});
        });
    }

    render() {
        let {current, options, visible_add, newName, department, subject, visible_table, table, loadingOptions} = this.state;
        let paths = this.props.location.pathname.split("/");
        let details = paths[1].split("_");
        let Class = details[1];
        let section = details[2];

        return <div className="Config">
            {(loadingOptions.open ? <Loading options={loadingOptions} /> : null)}
            <Modal visible={visible_add} closeModal={() => this.setState({visible_add: false})}>
                <div className="Config-Modal">
                    <p>Please enter a short unique name for the test/exam you are adding</p>
                    <input 
                        autoFocus
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
                            onClick={() => this.setState({visible_add: false})}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal visible={visible_table} closeModal={() => this.setState({visible_table: false})}>
                <Table 
                    current={table}
                />
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
            <FloatingControls onClick={() => this.setState({visible_add: true})} />
            <Bottombar 
                options={[{
                    value: "Back",
                    onClick: () => this.props.history.goBack()
                },{
                    value: "Check",
                    disabled: !validateOptions(this.state.options),
                    onClick: this.showTable
                },{
                    value: "Next",
                    disabled: !validateOptions(this.state.options),
                    onClick: this.next
                }]}
            />
        </div>;
    }
}

export default Config;