// Predefined Constant
export const DEPARTMENT = "Select Department",
SECTION = "Select Section",
CLASS = "Select Class",
SUBJECT = "Select Subject",
inputKeys = ["0","1","2","3","4","5","6","7","8","9",","],
Keys = [...inputKeys,"ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Backspace","Enter"];

// Utility Functions
export const getClasses = (data, dep) => {
    if (data!==null) {
        if (dep in data) {
            let Data = {...data};
            delete Data[dep].name;
            return Object.keys(Data[dep]);
        }
    }
    return [];
}

export const getSections = (data, dep, Class) => {
    if (data!==null) {
        if (dep in data) {
            if (Class in data[dep]) {
                return Object.keys(data[dep][Class]);
            }
        }
    }
    return [];
}

export const getSubjects = (data, dep, Class, section) => {
    if (data!==null) {
        if (dep in data) {
            if (Class in data[dep]) {
                if (section in data[dep][Class]) {
                    if (data[dep][Class][section].subjects.includes(",")) {
                        return data[dep][Class][section].subjects.split(",");
                    }
                }
            }
        }
    }
    return [];
}

// 1 - ctrl+c, 2 - ctrl+v
export const checkctrl = (e) => {
    let E = e || window.event;
    var key = E.which || E.keyCode; // keyCode detection
    var ctrl = E.ctrlKey ? E.ctrlKey : ((key === 17) ? true : false); // ctrl detection

    if ( key === 86 && ctrl ) {
        return 2;
    } else if ( key === 67 && ctrl ) {
        return 1;
    }

    return 0;
}

export const handleKeyDown = (e, selected, table) => {
    const [i, j] = selected;

    if (i!==-1 && j!==-1) {
        let Table = [...table];

        if (Keys.includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (["0","1","2","3","4","5","6","7","8","9",","].includes(e.key)) {
            Table[i][j] += e.key;
            return [i, j, Table];

        } else if (e.key==="Backspace") {
            Table[i][j] = Table[i][j].substring(0, Table[i][j].length - 1)
            return[i, j, Table];

        } else if (e.key==="ArrowUp") {
            let a = parseInt(i);
            if (a!==1) {a -= 1;}
            return [a.toString(), j, Table];

        } else if (e.key==="ArrowDown" || e.key==="Enter") {
            let a = parseInt(i);
            if (table.length!==(a+1)) {a += 1;}
            return [a.toString(), j, Table];

        } else if (e.key==="ArrowLeft") {
            let b = parseInt(j);
            if (b!==1) {b -= 1;}
            return [i, b.toString(), Table];

        } else if (e.key==="ArrowRight") {
            let b = parseInt(j);
            if (table[i].length!==(b+1)) {b += 1;}
            return [i, b.toString(), Table];
        }
    }

    return null;
}