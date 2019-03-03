
// External Libraries
import React from 'react';

// Internal Components and CSS
import './Appbar.css';

const Appbar = props => (
    <div className="Appbar">
        <h3>{props.title}</h3>
    </div>
);

export default Appbar;