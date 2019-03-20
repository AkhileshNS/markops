
// External Libraries
import React from 'react';

// Internal Libraries
import './Loading.css';

const Loading = props => {
    if ("options" in props) {
        return <div className="Loading-Foreground">
            <h2 className="large" style={{color: "var(--primary-dark)", marginBottom: "32px"}}>MarkOps</h2>
            {(props.options.message!==null ? <p style={{marginBottom: "32px"}}>{props.options.message}</p> : null)}
            {(props.options.error!==null ? <p><span className="error">Error: </span>{props.options.error}</p> : <div className="loader"></div>)}
        </div>;
    }
    return null;
}

export default Loading;