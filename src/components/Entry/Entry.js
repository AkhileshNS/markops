
// External Libraries
import React from 'react';

// Internal Libraries
import './Entry.css';
import Select from '../Select/Select';

const Entry = props => (
    <div className="entry">
        <p>Question: </p>
        <input
            type="text"
            value={props.name}
            placeholder="Name"
            onChange={e => props.entryChange(props.i, 0, e.target.value)} 
        />
        <Select 
            name={"CO" + props.i.toString()}
            value={(props.CO===null ? "CO" : props.CO)} 
            values={["1","2","3","4","5","6"]} 
            onChange={e => props.entryChange(props.i, 1, e.target.value)}
        />
        <Select 
            name={"PO" + props.i.toString()}
            value={(props.PO===null ? "PO" : props.PO)} 
            values={["1","2","3","4","5","6","7","8","9","10","11","12"]} 
            onChange={e => props.entryChange(props.i, 2, e.target.value)}
        />
        <input 
            type="text" 
            value={(props.max===null ? "" : props.max)} 
            placeholder="Max"
            onChange={e => props.entryChange(props.i, 3, e.target.value)} 
        />
        <button onClick={() => props.removeEntry(props.i)}>X</button>
    </div>
);


export default Entry