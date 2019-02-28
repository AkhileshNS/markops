
// External Libraries
import React, {Component} from 'react';

// Internal Libraries
import './Selection.css';
import Appbar from '../../components/Appbar/Appbar';
import Select from '../../components/Select/Select';

class Selection extends Component {
    state = {
        department: "Select Department",
        class: "Select Class",
        section: "Select Section",
        subject: "Select Subject"
    }

    render() {
        return <div className="Selection">
            <Appbar title="Choose the Department, Class and Section" />
            <Select 
                value={this.state.department}
                values={["ISE", "CSE"]}
                onChange={e => this.setState({department: e.target.value})} 
            />
            <Select
                value={this.state.class}
                values={["1", "2", "3", "4"]}
                onChange={e => this.setState({class: e.target.value})}
            />
            <Select 
                value={this.state.section}
                values={["A", "B", "both: Both"]}
                onChange={e => this.setState({section: e.target.value})}
            />
            <Select 
                value={this.state.subject}
                values={["SEO", "CNS", "EM", "SNA"]}
                onChange={e => this.setState({subject: e.target.value})}
            />
            <button>PO/CO Table</button>
            <button>Select</button>
        </div>;
    }
}

export default Selection;