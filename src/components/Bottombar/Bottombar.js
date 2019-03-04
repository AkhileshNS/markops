
// External Libraries
import React from 'react';

// Internal Components and CSS
import './Bottombar.css';

const Bottombar = props => {
    let {options} = props;
    let Values = [];

    for (let i in options) {
        let {value, onClick} = options[i];
        let disabled = false;

        if ("disabled" in options[i]) {
            disabled = options[i].disabled;
        }

        Values.push(<button key={"Bottombar: " + i.toString()} disabled={disabled} onClick={onClick}>{value}</button>);
    }

    return <div className="Bottombar">
        {Values}
    </div>;
}

export default Bottombar;