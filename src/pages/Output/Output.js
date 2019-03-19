
// External Modules
import React, {Component} from 'react';

// Internal Components and CSS
import './Output.css';
import Appbar from '../../components/Appbar/Appbar';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Bottombar from '../../components/Bottombar/Bottombar';
import { getTableValues, getTableConfig } from '../../database/controller';
import {getAttainments, constructTable} from './functions';

class Output extends Component {
    state = {attainments: {}};

    componentDidMount() {
        let params = this.props.location.pathname.split("/");
        getTableConfig(params[1], config => {
            getTableValues(params[1], values => {
                config = constructTable(config);
                console.log(getAttainments([...config, ...values]));
                this.setState({attainments: getAttainments([...config, ...values])});
            }, err => console.log(err));
        }, err => console.log(err));
    }

    render() {
        const {attainments} = this.state;

        let Attainments = [];
        for (let test in attainments) {
            Attainments.push(<p className="Output__Main__Title">{test}</p>);
            for (let question in attainments[test]) {
                console.log(attainments[test][question].percentage);
                Attainments.push(<div className="Output__Main__Progress" key={test+"-"+question}>
                    <p className="Output__Main__Progress__Texts">{question}: </p>
                    <ProgressBar progress={attainments[test][question].percentage}/>
                </div>);
            }
        }

        return <div className="Output">
            <Appbar title="Final Results" />
            <div className="Output__Main">
                {Attainments}
            </div>
            <Bottombar />
        </div>;
    }
}

export default Output;