
// External Libraries
import React, {Component} from 'react';

// Internal Components and CSS
import './Entries.css';
import Entry from '../../components/Entry/Entry';

class Entries extends Component {
    entryChange = (entryIndex, entryKeyIndex, entryValue) => {
        let entries = [...this.props.entries];
        let entry = entries[entryIndex].split(",");
        entry[entryKeyIndex] = entryValue;
        entries[entryIndex] = entry.join(",");
        this.props.onChange(entries);
    }

    removeEntry = (entryIndex) => {
        let entries = [...this.props.entries];
        entries.splice(entryIndex, 1);
        this.props.onChange(entries);
    }

    addEntry = () => {
        let entries = [...this.props.entries];
        entries.push(",Select CO,Select PO,");
        this.props.onChange(entries);
    }

    render() {
        let {entries} = this.props;
        let Entries = [];

        for (let i in entries) {
            let [name, CO, PO, max] = entries[i].split(",");
            Entries.push(
            <Entry 
                key={"Entries:" + i.toString()}
                i={i}
                name={name}
                CO={CO}
                PO={PO}
                max={max}
                entryChange={this.entryChange}
                removeEntry={this.removeEntry}
            />);
        }

        return <div className="Entries">
            {Entries}
            {(entries===null ? null : <button onClick={this.addEntry} className="Entries-Ok">New</button>)}
            {(entries===null ? null : <button onClick={this.removeTest} className="Entries-Cancel">Remove Test</button>)}
        </div>;
    }
}

export default Entries;