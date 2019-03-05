
export const validateOptions = options => {
    console.log(options);

    if (options===null || options==={}) {
        return false;
    }

    for (let test in options) {
        if (options[test].length===0) {
            return false;
        }

        for (let i in options[test]) {
            let [question, CO, PO, max] = options[test][i].split(",");
            if (question==="" || CO==="Select CO" || PO==="Select PO" || max==="") {
                return false;
            }
        }
    }

    return true;
}