
// External Libraries
import React from 'react';

// Internal Libraries
import './Bottombar.css';

const Bottombar = props => {
    let {options} = props;
    let Values = [];

    for (let i in options) {
        let {value, onClick} = options[i];

        Values.push(<button key={"Bottombar: " + i.toString()} onClick={onClick}>{value}</button>);
    }

    return <div className="Bottombar">
        {Values}
    </div>;
}

export default Bottombar;