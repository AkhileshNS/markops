
// External Modules
import React, { Component } from 'react';
import ReactDataGrid from "react-data-grid";

// Internal CSS and Components
import './Options.css';
import Appbar from '../../components/Appbar/Appbar';
import Bottombar from '../../components/Bottombar/Bottombar';
import Loading from '../../components/Loading/Loading';

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
  
const rows = createPlaceholders(placeholder, 1000);

export default class Options extends Component {
    state = {rows, abbr: {}, options: {open: true, message: "Loading Options COnfiguration...", error: null}};

    componentDidMount() {
        getDepartments(deps => {
            this.setState({...getRows(deps), options: {open: false, message: null, error: null}});
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
        if (validateRows(this.state.rows)===1) {
            setDepartments(getDepsFromRows(this.state.rows, this.state.abbr), msg => console.log(msg), err => console.log(err));
        } else {
            alert(validateRows(this.state.rows));
        }
    }

    render() {
        const {open, options, rows} = this.state;

        return (
        <div className="Options">
            {(open ? <Loading options={options} /> : null)}
            <Appbar title="Setup Initial Configuration" />
            <ReactDataGrid
                columns={columns}
                rowGetter={i => rows[i]}
                rowsCount={1000}
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
