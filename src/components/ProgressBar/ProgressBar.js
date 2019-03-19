
// External Modules
import React from 'react';

// Internal CSS
import './ProgressBar.css';

const ProgressBar = props => (
    <div className="ProgressBar">
        <div className="Progress" style={{width: props.progress + "%"}} />
    </div>
);

export default ProgressBar;