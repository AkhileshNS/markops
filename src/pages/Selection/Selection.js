
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
import {
    getDepartments, 
    getSubjectRatios, 
    setSubjectRatios
} from '../../database/controller';
import {
    DEPARTMENT, 
    CLASS, 
    SECTION, 
    SUBJECT, 
    inputKeys, 
    getClasses, 
    getSections, 
    getSubjects, 
    handleKeyDown,
    checkctrl
} from './functions';
import {
    subscribe, 
    unsubscribe, 
    getSelectionState, 
    setSelectionState
} from '../../database/localStore';

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
        table: null,
        newName: "",
        clipboard: ""
    }

    componentDidMount() {
        subscribe(this.trigger);

        getDepartments(res => {
            console.log(res);
            this.setState({data: res});
        }, err => console.log(err));

        document.addEventListener("keydown", e => {
            let check = checkctrl(e);

            if (check===0) {
                let res = handleKeyDown(e, this.state.selected, this.state.table);
                if (res!==null) {
                    this.setState({selected: [res[0], res[1]], table: res[2]});
                }
            } else if (check===2 && this.state.clipboard!=="") {
                let table = [...this.state.table];
                table[this.state.selected[0]][this.state.selected[1]] = this.state.clipboard;
                this.setState({table});
            } else {
                this.setState({clipboard: this.state.table[this.state.selected[0]][this.state.selected[1]]});
            }
        }, false);
    }

    componentWillUnmount() {
        unsubscribe(this.trigger);
        document.removeEventListener("keydown", () => console.log("Removing keydown event listener"), false);
    }

    trigger = () => {
        let state = getSelectionState();
        if (state!==null) {
            this.setState({...state, selected: [-1,-1], table: null});
        }
    }

    // Modal Methods
    openModal = () => {
        if (this.state.table===null) {
            getSubjectRatios(this.state.subject, table => {
                this.setState({table, visible: true});
            });
        } else {
            this.setState({visible: true});
        }
    }
    closeModal = () => this.setState({visible: false});
    saveModal = () => {
        setSubjectRatios(this.state.subject, this.state.table, () => {
            this.setState({visible: false});
        });
    }
    handleTableClick = (i,j) => {
        if (i>0 && j>0) {
            this.setState({selected: [i,j]});
        } else {
            let table = [...this.state.table];
            i = parseInt(i); j = parseInt(j);
            if (i===0 && j>0) {
                for (let k in table) {
                    table[k].splice(j, 1);
                }
            } else if (j===0 && i>0) {
                table.splice(i, 1);
            }
            this.setState({table});
        }
    };
    handleTableValueChange = e => {
        if (inputKeys.includes(e.target.value)) {
            let table = [...this.state.table];
            table[this.state.selected[0]][this.state.selected[1]] = e.target.value;
            this.setState({table});
        }
    }
    addCO = () => {
        let table = [...this.state.table];
        let data = ["CO" + this.state.newName + "|hd"];
        for (let i=1; i<table[0].length; i++) {
            data.push("");
        }
        table.push(data);
        this.setState({table});
    }
    addPO = () => {
        let table = [...this.state.table];
        table[0].push("PO" + this.state.newName + "|hd");
        for (let i=1; i<table.length; i++) {
            table[i].push("");
        }
        this.setState({table});
    }

    render() {
        let {department, Class, section, subject, data, visible, selected, table} = this.state;

        return <div className="Selection">
            <Modal visible={visible} closeModal={this.closeModal}>
                <div className="Selection-Modal">
                    <div className="Selection-Modal-Appbar">
                        <input 
                            type="text"
                            placeholder="CO/PO number"
                            value={this.state.newName} 
                            onChange={e => this.setState({newName: e.target.value})} 
                        />
                        <button onClick={this.addCO}>Add CO</button>
                        <button onClick={this.addPO}>Add PO</button>
                        <button className="final" onClick={this.saveModal}>Save Changes</button>
                    </div>
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
                onChange={e => {
                    if (e.target.value!==subject) {
                        this.setState({subject: e.target.value, selection: [-1, -1], table: null});
                    }
                }}
            />
            <p>You can select options one after another. An option will not be selectable until the previous has been selected. You can check the Course Outcome/Program Outcome table after selecting all four options.</p>
            <Bottombar
                options={[{
                    value: "CO/PO Table",
                    onClick: this.openModal,
                    disabled: this.state.subject===SUBJECT
                },{
                    value: "Select",
                    onClick: () => {
                        setSubjectRatios(this.state.subject, this.state.table, () => {
                            this.props.history.push(`/${department}_${Class}_${section}_${subject}`);
                            let selectionState = {...this.state};
                            delete selectionState.table;
                            delete selectionState.selected;
                            setSelectionState(selectionState);
                        });
                    },
                    disabled: this.state.subject===SUBJECT
                }]}
            />
        </div>;
    }
}

export default Selection;