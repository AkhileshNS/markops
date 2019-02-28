
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
                options={[{
                    content: "ISE",
                    value: "ISE"
                },{
                    content: "CSE",
                    value: "CSE"
                }]}
                onChange={e => this.setState({department: e.target.value})} 
            />
            <Select 
                value={this.state.class}
                options={[{
                    content: "1",
                    value: "1"
                },{
                    content: "2",
                    value: "2"
                },{
                    content: "3",
                    value: "3"
                },{
                    content: "4",
                    value: "4"
                }]}
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