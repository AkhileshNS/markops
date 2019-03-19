
// External Modules
import React, {Component} from 'react';

// Internal Components and CSS
import './Output.css';
import Appbar from '../../components/Appbar/Appbar';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Bottombar from '../../components/Bottombar/Bottombar';
import {getTableValues, getTableConfig} from '../../database/controller';
import {getAttainments, constructTable, getRates} from './functions';

class Output extends Component {
    state = {attainments: {}, tests: [], rates: {}};

    componentDidMount() {
        let params = this.props.location.pathname.split("/");
        getTableConfig(params[1], config => {
            getTableValues(params[1], values => {
                config = constructTable(config);
                this.setState(getAttainments([...config, ...values]), () => {
                    this.setState({rates: getRates(this.state.attainments)});
                });
            }, err => console.log(err));
        }, err => console.log(err));
    }

    render() {
        const {attainments, tests, rates} = this.state;

        let Attainments = [];
        let Rates = [];

        for (let test of tests) {
            Attainments.push(<p key={test+"title"} className="Output__Main__Title">{test}</p>);
            for (let question in attainments[test]) {
                Attainments.push(<div className="Output__Main__Progress" key={test+"-"+question}>
                    <p className="Output__Main__Progress__Text">{question}: {attainments[test][question].percentage}%</p>
                    <ProgressBar progress={attainments[test][question].percentage}/>
                </div>);
            }
        }

        for (let rate in rates) {
            Rates.push(<div className="Output__Main__Progress" key={rate}>
                <p className="Output__Main__Progress__Text">{rate}: {rates[rate].rate}%</p>
                <ProgressBar progress={rates[rate].rate} />
            </div>);
        }

        return <div className="Output">
            <Appbar title="Final Results" />
            <p className="Output__Title">Attainment Percentage</p>
            <div className="Output__Main">
                {Attainments}
            </div>
            <p className="Output__Title">Course Outcome Rate</p>
            <div className="Output__Main" style={{paddingTop: "8px"}}>
                {Rates}
            </div>
            <Bottombar 
                options={[{
                    value: "Back",
                    onClick: () => this.props.history.goBack()
                }]}
            />
        </div>;
    }
}

export default Output;