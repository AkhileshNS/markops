
// External Libraries
import React, {Component} from 'react';

// Internal Libraries
import './Selection.css';
import Appbar from '../../components/Appbar/Appbar';
import Select from '../../components/Select/Select';
import Bottombar from '../../components/Bottombar/Bottombar';
import Modal from '../../components/Modal/Modal';
import Table from '../../components/Table/Table';
import {getDepartments} from '../../database/controller';

/*
    {
        ISE: {
            1: {
                A: ",,"
            }
        }
    }
*/

// Predefined Constant
const DEPARTMENT = "Select Department";
const SECTION = "Select Section";
const CLASS = "Select Class";
const SUBJECT = "Select Subject";

// Utility Functions
const getClasses = (data, dep) => {
    if (data!==null) {
        if (dep in data) {
            let Data = {...data};
            delete Data[dep].name;
            return Object.keys(Data[dep]);
        }
    }
    return [];
}

const getSections = (data, dep, Class) => {
    if (data!==null) {
        if (dep in data) {
            if (Class in data[dep]) {
                return Object.keys(data[dep][Class]);
            }
        }
    }
    return [];
}

const getSubjects = (data, dep, Class, section) => {
    if (data!==null) {
        if (dep in data) {
            if (Class in data[dep]) {
                if (section in data[dep][Class]) {
                    if (data[dep][Class][section].subjects.includes(",")) {
                        return data[dep][Class][section].subjects.split(",");
                    }
                }
            }
        }
    }
    return [];
}

class Selection extends Component {
    state = {
        department: DEPARTMENT,
        Class: CLASS,
        section: SECTION,
        subject: SUBJECT,
        data: null,
        visible: false
    }

    componentDidMount() {
        getDepartments(res => {
            console.log(res);
            this.setState({data: res});
        }, err => console.log(err));

        document.addEventListener("keydown", e => console.log(e));
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

    render() {
        let {department, Class, section, subject, data, visible} = this.state;

        return <div className="Selection">
            <Modal visible={visible} closeModal={this.closeModal}>
                <div className="Selection-Modal">
                    <Table 
                        current={[
                            ["CO/PO","PO1|h","PO2|h","PO3|h","PO4|h","PO5|h","PO6|h","PO7|h","PO8|h","PO9|h","PO10|h","PO11|h","PO12|h"],
                            ["CO1|h","","","","","","","","","","","",""],
                            ["CO2|h","","","","","","","","","","","",""],
                            ["CO3|h","","","","","","","","","","","",""],
                            ["CO4|h","","","","","","","","","","","",""],
                            ["CO5|h","","","","","","","","","","","",""]
                        ]}
                        onClick={(i,j) => console.log(`Cell(${i},${j}) clicked!!!`)}
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