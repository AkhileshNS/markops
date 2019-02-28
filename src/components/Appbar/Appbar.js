
// External Libraries
import React from 'react';

// Internal Libraries
import './Appbar.css';

const Appbar = props => (
    <div  className="Appbar">
        <h2>{props.title}</h2>
    </div>
);

export default Appbar;