
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

/* 
    [
        ["Test","test 1|e6"],
        ["PO","1"],
        ["CO","1"],
        ["Qname","1A"],
        ["Max","10"],
        ["1BM16IS009","8.7"]
    ]
*/
export const getAttainments = (values) => {
    let attainments = {};

    for (let i=5; i<values.length; i++) {
        for (let j=1; j<values[i].length; j++) {
            let value = values[i][j];

            if (value!=="") {
                let testName = (values[0][j].includes("|") ? values[0][j].split("|") : [values[0][j]]);
                let qname = (values[3][j].includes("|") ? values[3][j].split("|") : [values[3][j]]);
                let maxValue = parseFloat(values[4][j]);

                testName = testName[0];
                if (!(testName in attainments)) {
                    attainments[testName] = {};
                }

                qname = qname[0];
                if (!(qname in attainments[testName])) {
                    attainments[testName][qname] = {
                        attempted: 0,
                        attained: 0
                    };
                }

                attainments[testName][qname].attempted++;
                if (parseFloat(value) >= (0.7*maxValue)) {
                    attainments[testName][qname].attained++;
                }
            }
        }
    }

    for (let test in attainments) {
        for (let question in attainments[test]) {
            attainments[test][question] = {
                ...attainments[test][question],
                percentage: (attainments[test][question].attained/attainments[test][question].attempted) * 100
            };
        }
    }

    return attainments;
}