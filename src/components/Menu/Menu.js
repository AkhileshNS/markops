
// External Libraries
import React from 'react';

// Internal Libraries
import './Menu.css';

const Menu = props => {
    let options = [];

    if ("options" in props && "onCommandSelected" in props) {
        for (let option of props.options) {
            let values = [];
            if (option.includes(":")) {
                values = option.split(":");
            } else {
                values = [option, option];
            }

            options.push(<button key={values[0]} onClick={() => props.onCommandSelected(values[0])}>
                {values[1]}
            </button>);
        }

        
    }

    if ("addCommand" in props) {
        options.push(<button className="add" key="+" onClick={props.addCommand}>+</button>);
    }
    return <div className="Menu">{options}</div>;
}

export default Menu;