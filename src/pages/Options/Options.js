
// External Modules
import React, { Component } from 'react';
import ReactDataGrid from "react-data-grid";

// Internal CSS and Components
import './Options.css';
import Appbar from '../../components/Appbar/Appbar';
import Bottombar from '../../components/Bottombar/Bottombar';

// Internal Functions
import {createPlaceholders, getRows, validateRows, getDepsFromRows} from './functions';
import {getDepartments, setDepartments} from '../../database/controller';

const placeholder = {department: "", class: "", section: "", subject: ""}

const columns = [
    { key: "department", name: "Department", editable: true },
    { key: "class", name: "Class", editable: true },
    { key: "section", name: "Section", editable: true },
    { key: "subject", name: "Subject", editable: true }
];
  
const rows = createPlaceholders(placeholder, 100);

export default class Options extends Component {
    state = {rows, abbr: {}};

    componentDidMount() {
        getDepartments(deps => {
            this.setState(getRows(deps));
        }, err => console.log(err));
    }
    
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
          const rows = state.rows.slice();
          for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated };
          }
          return { rows };
        });
    };

    setConfiguration = () => {
        if (validateRows(this.state.rows)) {
            console.log(getDepsFromRows(this.state.rows, this.state.abbr));
            setDepartments(getDepsFromRows(this.state.rows, this.state.abbr), msg => console.log(msg), err => console.log(err));
        } else {
            alert("All of the columns in a row must either be empty or hold a value. Any one column in a row cannot be empty while the other have values");
        }
    }

    render() {
        return (
        <div className="Options">
            <Appbar title="Setup Initial Configuration" />
            <ReactDataGrid
                columns={columns}
                rowGetter={i => this.state.rows[i]}
                rowsCount={100}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
                minHeight="calc(100vh - 50px - 64px)"
            />
            <Bottombar 
                options={[{
                    value: "Set Configuration",
                    onClick: this.setConfiguration
                }]}
            />
        </div>
        )
    }
}
