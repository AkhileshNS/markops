
// External Libraries
import React, {Component} from 'react';

// Internal Components and CSS
import './Selection.css';
import Appbar from '../../components/Appbar/Appbar';
import Select from '../../components/Select/Select';
import Bottombar from '../../components/Bottombar/Bottombar';
import Modal from '../../components/Modal/Modal';
import Table from '../../components/Table/Table';

// Functions (Utility and Database)
import {getDepartments} from '../../database/controller';
import {DEPARTMENT, CLASS, SECTION, SUBJECT, inputKeys, getClasses, getSections, getSubjects, handleKeyDown} from './functions';

/*
    {
        ISE: {
            1: {
                A: ",,"
            }
        }
    }
*/

class Selection extends Component {
    state = {
        department: DEPARTMENT,
        Class: CLASS,
        section: SECTION,
        subject: SUBJECT,
        data: null,
        visible: false,
        selected: [-1, -1],
        table: [
            ["CO/PO","PO1|h","PO2|h","PO3|h","PO4|h","PO5|h","PO6|h","PO7|h","PO8|h","PO9|h","PO10|h","PO11|h","PO12|h"],
            ["CO1|h","","","","","","","","","","","",""],
            ["CO2|h","","","","","","","","","","","",""],
            ["CO3|h","","","","","","","","","","","",""],
            ["CO4|h","","","","","","","","","","","",""],
            ["CO5|h","","","","","","","","","","","",""]
        ]
    }

    componentDidMount() {
        getDepartments(res => {
            console.log(res);
            this.setState({data: res});
        }, err => console.log(err));

        document.addEventListener("keydown", e => {
            let res = handleKeyDown(e, this.state.selected, this.state.table);
            if (res!==null) {
                this.setState({selected: [res[0], res[1]], table: res[2]});
            }
        });
    }

    componentWillUnmount() {
        document.removeEventListener("keydown");
    }

    // Modal Methods
    openModal = () => {
        if (this.state.subject!==SUBJECT) {
            this.setState({visible: true});
        }
    }
    closeModal = () => this.setState({visible: false});
    handleTableClick = (i,j) => {
        if (i>0 && j>0) {
            this.setState({selected: [i,j]});
        }
    };
    handleTableValueChange = e => {
        if (inputKeys.includes(e.target.value)) {
            let table = [...this.state.table];
            table[this.state.selected[0]][this.state.selected[1]] = e.target.value;
            this.setState({table});
        }
    }

    render() {
        let {department, Class, section, subject, data, visible, selected, table} = this.state;

        return <div className="Selection">
            <Modal visible={visible} closeModal={this.closeModal}>
                <div className="Selection-Modal">
                    <input 
                        type="text"
                        disabled={[-1,0].includes(selected[0]) || [-1,0].includes(selected[1])}
                        placeholder="Choose one of the cells to start editing it's value..."
                        value={(![-1,0].includes(selected[0]) && ![-1,0].includes(selected[1]) ? table[selected[0]][selected[1]] : "")}
                        onChange={this.handleTableValueChange}
                    />
                    <Table 
                        selected={selected}
                        current={table}
                        onClick={this.handleTableClick}
                    />
                </div>
            </Modal>
            <Appbar title="Choose the Department, Class and Section" />
            <Select
                name="dep" 
                value={department}
                values={["ISE", "CSE"]}
                onChange={e => this.setState({department: e.target.value})} 
            />
            <Select
                name="class"
                disabled={department===DEPARTMENT}
                value={Class}
                values={getClasses(data, department)}
                onChange={e => this.setState({Class: e.target.value})}
            />
            <Select
                name="sec" 
                disabled={Class===CLASS}
                value={section}
                values={getSections(data, department, Class)}
                onChange={e => this.setState({section: e.target.value})}
            />
            <Select
                name="sub" 
                disabled={section===SECTION}
                value={subject}
                values={getSubjects(data, department, Class, section)}
                onChange={e => this.setState({subject: e.target.value})}
            />
            <p>You can select options one after another. An option will not be selectable until the previous has been selected. You can check the Course Outcome/Program Outcome table after selecting all four options.</p>
            <Bottombar
                options={[{
                    value: "CO/PO Table",
                    onClick: this.openModal
                },{
                    value: "Select",
                    onClick: () => console.log("Selected values")
                }]}
            />
        </div>;
    }
}

export default Selection;