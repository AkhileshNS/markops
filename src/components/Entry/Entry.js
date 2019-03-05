
// External Libraries
import React from 'react';

// Internal Components and CSS
import './Entry.css';

// Utility Functions
import {validateName, validateCOorPO, validateMax} from './functions/validation';

const Entry = props => (
    <div className="Entry">
        <p>Question: </p>
        <input
            type="text"
            value={props.name===null ? "" : props.name}
            placeholder="Name"
            onChange={e => {
                if (validateName(e.target.value)) {
                    props.entryChange(props.i, 0, e.target.value);
                }
            }}
        />
        <input
            type="text"
            value={props.CO===null ? "" : props.CO} 
            placeholder="Course Outcome"
            onChange={e => {
                if (validateCOorPO(e.target.value)) {
                    props.entryChange(props.i, 1, e.target.value);
                }
            }}
        />
        <input 
            type="text"
            value={props.PO===null ? "" : props.PO} 
            placeholder="Program Outcome"
            onChange={e => {
                if (validateCOorPO(e.target.value)) {
                    props.entryChange(props.i, 2, e.target.value);
                }
            }}
        />
        <input 
            type="text" 
            value={(props.max===null ? "" : props.max)} 
            placeholder="Max"
            onChange={e => {
                if (validateMax(e.target.value)) {
                    props.entryChange(props.i, 3, e.target.value);
                }
            }}
        />
        <button onClick={() => props.removeEntry(props.i)}>X</button>
    </div>
);


export default Entry