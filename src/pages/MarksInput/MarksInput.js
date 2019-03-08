
// External Libraries
import React, {Component} from 'react';

// Internal Components and CSS
import './MarksInput.css';
import Appbar from '../../components/Appbar/Appbar';
import Bottombar from '../../components/Bottombar/Bottombar';
import Table from '../../components/Table/Table';

// Database and Utility Functions
import {getTableConfig, getTableValues, setTableValues} from '../../database/controller';
import {inputKeys, constructTable, checkctrl, handleKeyDown} from './functions';

class MarksInput extends Component {
    state = {
        table: null,
        selected: [-1, -1],
        clipboard: ""
    };

    componentDidMount() {
        let params = this.props.location.pathname.split("/");
        // let [department, Class, section, subject] = params[1].split("_");

        getTableConfig(params[1], res => {
            let table = constructTable(res);
            getTableValues(params[1], Res => {
                table = [
                    ...table,
                    ...Res
                ];

                table.push([]);
                for (let i=0; i<table[1].length; i++) {
                    table[table.length-1].push("");
                }
                this.setState({table});

            }, err => {
                table.push([]);
                for (let i=0; i<table[1].length; i++) {
                    table[table.length-1].push("");
                }
                this.setState({table});

                console.log(err);
            });
        }, err => console.log(err));

        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    // Handlers
    handleTableClick = (i, j) => {
        if (i>4) {
            this.setState({selected: [i, j]});
        }
    }

    handleKeyDown = e => {
        let check = checkctrl(e);

        if (check===0) {
            let res = handleKeyDown(e, this.state.selected, this.state.table);
            if (res!==null) {
                if (parseInt(res[0])===this.state.table.length-1 && res[2][parseInt(res[0])][parseInt(res[1])]!=="") {
                    let placeholder = [];
                    for (let i=0; i<res[2][1].length; i++) {placeholder.push("");}
                    res[2].push(placeholder);
                } 
                this.setState({selected: [res[0], res[1]], table: res[2]});
            }
        } else if (check===2 && this.state.clipboard!=="") {
            let table = [...this.state.table];
            table[this.state.selected[0]][this.state.selected[1]] = this.state.clipboard;
            this.setState({table});
        } else {
            this.setState({clipboard: this.state.table[this.state.selected[0]][this.state.selected[1]]});
        }
    }

    handleTableValueChange = e => {
        if (inputKeys.includes(e.target.value)) {
            let table = [...this.state.table];
            table[this.state.selected[0]][this.state.selected[1]] = e.target.value;
            this.setState({table});
        }
    }

    next = () => {
        let params = this.props.location.pathname.split("/");
        setTableValues(params[1], this.state.table, msg => console.log(msg), err => console.log(err));
    }

    render() {
        let {table, selected} = this.state;

        return <div className="MarksInput">
            <Appbar title="Enter Marks and Other Details" />
            <Table 
                current={table}
                tableStyle={{minWidth: "100%"}}
                selected={selected}
                onClick={this.handleTableClick}
            />
            <Bottombar 
                options={[{
                    value: "Back",
                    onClick: () => this.props.history.goBack()
                },{
                    value: "Next",
                    onClick: this.next
                }]}
            />
        </div>;
    }
};

export default MarksInput;