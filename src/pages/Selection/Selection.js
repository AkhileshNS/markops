
// External Libraries
import React, {Component} from 'react';

// Internal Libraries
import './Selection.css';
import Appbar from '../../components/Appbar/Appbar';
import Select from '../../components/Select/Select';
import Bottombar from '../../components/Bottombar/Bottombar';
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

// Utility Functions
const getClasses = (data, dep) => {
    if (data!==null) {
        if (dep in data) {
            return Object.keys(data[dep]);
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
                    return data[dep][Class][section].split(",");
                }
            }
        }
    }
    return [];
}

class Selection extends Component {
    state = {
        department: "Select Department",
        Class: "Select Class",
        section: "Select Section",
        subject: "Select Subject",
        data: null
    }

    componentDidMount() {
        getDepartments(res => {
            console.log(res);
            this.setState({data: res});
        }, err => console.log(err));
    }

    render() {
        let {department, Class, section, subject, data} = this.state;

        return <div className="Selection">
            <Appbar title="Choose the Department, Class and Section" />
            <Select
                name="dep" 
                value={department}
                values={["ISE", "CSE"]}
                onChange={e => this.setState({department: e.target.value})} 
            />
            <Select
                name="class"
                disabled={department==="Select Department"}
                value={Class}
                values={getClasses(data, department)}
                onChange={e => this.setState({Class: e.target.value})}
            />
            <Select
                name="sec" 
                disabled={Class==="Select Class"}
                value={section}
                values={getSections(data, department, Class)}
                onChange={e => this.setState({section: e.target.value})}
            />
            <Select
                name="sub" 
                disabled={section==="Select Section"}
                value={subject}
                values={getSubjects(data, department, Class, section)}
                onChange={e => this.setState({subject: e.target.value})}
            />
            <p>You can select options one after another. An option will not be selectable until the previous has been selected. You can check the Course Outcome/Program Outcome table after selecting all four options.</p>
            <Bottombar
                options={[{
                    value: "CO/PO Table",
                    onClick: () => console.log("Open CO/PO Table")
                },{
                    value: "Select",
                    onClick: () => console.log("Selected values")
                }]}
            />
        </div>;
    }
}

export default Selection;