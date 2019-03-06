
// External Libraries
import React, {Component} from 'react';

// Internal Components and CSS
import './MarksInput.css';
import Appbar from '../../components/Appbar/Appbar';
import Bottombar from '../../components/Bottombar/Bottombar';
import Table from '../../components/Table/Table';

// Database and Utility Functions
import {getTableConfig} from '../../database/controller';
import {constructTable} from './functions';

class MarksInput extends Component {
    state = {
        table: null,
        selected: [-1, -1]
    };

    componentDidMount() {
        let params = this.props.location.pathname.split("/");
        let [department, Class, section, subject] = params[1].split("_");

        getTableConfig(params[1], res => {
            let table = constructTable(res);
            table.push([]);
            for (let i in table[1]) {
                table[table.length-1].push("");
            }
            console.log(table);
            this.setState({table});
        }, err => console.log(err));
    }

    handleTableClick = (i, j) => {
        if (i>4) {
            
        }
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
                    onClick: () => console.log("Next Clicked")
                }]}
            />
        </div>;
    }
};

export default MarksInput;