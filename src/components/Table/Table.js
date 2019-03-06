
// External Libraries
import React from 'react';

// Internal Components and CSS
import "./Table.css";

// Utility Functions
import {extractNumber} from './functions';

const Table = props => {
    let tables = [props.current];
    let Table = [];

    for (let k in tables) {
        let table = tables[k];
        if (table===null) {
            continue;
        }

        let rows = [];
        for (let i in table) {

            let columns = [];
            for (let j in table[i]) {
                let info = table[i][j];

                let containerStyle = "";
                let textStyle = "";
                let columnStyle = {
                    minWidth: "75px"
                };
                if (info.includes("|")) {
                    let keys = info.split("|");
                    info = keys[0];

                    for (let key of keys[1]) {
                        switch(key) {
                            case "h": {
                                containerStyle += "header ";
                                textStyle += "header-title ";
                                break;
                            }
                            case "t": {
                                containerStyle += "top";
                                break;
                            }
                            case "b": {
                                containerStyle += "bottom";
                                break;
                            }
                            case "l": {
                                containerStyle += "-left ";
                                break;
                            }
                            case "r": {
                                containerStyle += "-right ";
                                break;
                            }
                            case "p": {
                                textStyle += "red ";
                                break;
                            }
                            case "n": {
                                textStyle += "green ";
                                break;
                            }
                            case "d": {
                                containerStyle += "deletion ";
                                break;
                            }
                            case "e": {
                                containerStyle += "nohovereffects ";
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }

                    let value = extractNumber(keys[1]);
                    if (value!==null) {
                        columnStyle = {
                            minWidth: (value[0]*75) + "px"
                        };
                    }

                }

                if (i%2===1) {
                    containerStyle += "grey ";
                }

                if ("selected" in props) {
                    if (i===props.selected[0] && j===props.selected[1]) {
                        containerStyle += "selected ";
                    }
                }

                columns.push(<td 
                    onClick={("onClick" in props ? () => props.onClick(i, j) : null)} 
                    key={j} 
                    className={"column " + containerStyle}
                    style={columnStyle}>
                    <p className={textStyle}>{info}</p>
                </td>);
            }
            rows.push(<tr key={i} className={"row"}>
                {columns}
            </tr>);
        }

        Table.push(<table key={k} className="table">
            <tbody>{rows}</tbody>
        </table>);
    }

    return <div className="Table">
        {Table}
    </div>
};

export default Table;