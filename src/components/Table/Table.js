
// External Libraries
import React from 'react';

// Internal Libraries
import "./Table.css";

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
                            default: break;
                        }
                    }
                }

                if (i%2===1) {
                    containerStyle += "grey "
                }

                columns.push(<div onClick={() => props.onClick(i, j)} key={j} className={"column " + containerStyle}>
                    <p className={textStyle}>{info}</p>
                </div>);
            }
            rows.push(<div key={i} className={"row"}>
                {columns}
            </div>);
        }

        Table.push(<div key={k} className="table">
            {rows}
        </div>);
    }

    return <div className="TimeTable">
        {Table}
    </div>
};

export default Table;