
export const validateOptions = options => {
    if (options===null || options==={}) {
        return false;
    }

    for (let test in options) {
        if (options[test].length===0) {
            return false;
        }

        for (let i in options[test]) {
            let [question, CO, PO, max] = options[test][i].split(":");
            if (question==="" || CO==="" || PO==="" || max==="") {
                return false;
            }
        }
    }

    return true;
}

/*
    options = {
        "test 1": ["1A:1:1:10","1B:1:2:10"]
    }
*/
export const constructTable = options => {
    let table = [["Test|e"],["PO|e"],["CO|e"],["Qname|e"],["Max|e"]];
    for (let option in options) {
        table[0].push(option + "|he" + options[option].length);

        for (let qcpm of options[option]) {
            let [question, CO, PO, Max] = qcpm.split(":");
            table[3].push(question + "|he");
            table[1].push(PO + "|he");
            table[2].push(CO + "|he");
            table[4].push(Max + "|he");
        }
    }
    return table;
}