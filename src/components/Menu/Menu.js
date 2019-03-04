
// External Libraries
import React from 'react';

// Internal Components and CSS
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

            let styles = {};
            if (props.current===values[0]) {
                styles["className"] = "Menu-selected";
            }

            options.push(<button {...styles} key={values[0]} onClick={() => props.onCommandSelected(values[0])}>
                {values[1]}
            </button>);
        }

        
    }
    
    return <div className="Menu">{options}</div>;
}

export default Menu;