
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

const extractNumber = value => {
    if (value===null || value==="" || !/\d/.test(value)) {
        return null;
    }
    return value.match(/\d+/g).map(Number);
}

export const expandArr = arr => {
    let newArr = [];
    for (let test of arr) {
        if (test.includes("|")) {
            let [name, properties] = test.split("|");
            let appearances = extractNumber(properties);
            if (appearances===null) {
                newArr.push(test);
            } else {
                for (let i=0; i<appearances[0]; i++) {
                    newArr.push(name);
                }
            }   
        } else {
            newArr.push(test);
        }
    }

    return newArr;
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
    let tests = [];
    values[0] = expandArr(values[0]);

    for (let i=5; i<values.length; i++) {
        for (let j=1; j<values[i].length; j++) {
            let value = values[i][j];

            if (value!=="") {
                let testName = (values[0][j].includes("|") ? values[0][j].split("|") : [values[0][j]]);
                let qname = (values[3][j].includes("|") ? values[3][j].split("|") : [values[3][j]]);
                let maxValue = parseFloat(values[4][j]);
                let PO = values[1][j].split("|")[0];
                let CO = values[2][j].split("|")[0];

                testName = testName[0];
                if (!(testName in attainments)) {
                    attainments[testName] = {};
                    tests.push(testName);
                }

                qname = qname[0];
                if (!(qname in attainments[testName])) {
                    attainments[testName][qname] = {
                        PO, CO,
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

    console.log(attainments);

    return {attainments, tests};
}

/*
    values: {
        test 1: {
            1A: {PO: "1", CO: "1", attempted: 1, attained: 1, percentage: 100},
            1B: {PO: "1", CO: "1", attempted: 1, attained: 1, percentage: 100},
            2A: {PO: "1", CO: "1", attempted: 2, attained: 1, percentage: 50},
            3A: {PO: "1", CO: "1", attempted: 1, attained: 0, percentage: 0}
        }
    }
*/
export const getRates = (values) => {
    let rates = {};

    for (let test in values) {
        for (let question in values[test]) {
            let {PO, CO, percentage} = values[test][question];
            PO = (PO.includes(",") ? PO.split(",") : [PO]);
            CO = (CO.includes(",") ? CO.split(",") : [CO]);

            for (let co of CO) {
                let rate = "CO" + co;
                if (!(rate in rates)) {
                    rates[rate] = {
                        percentage: 0,
                        count: 0
                    };
                }

                rates[rate].percentage += percentage;
                rates[rate].count += 1;
            }
        }
    }

    for (let co in rates) {
        rates[co] = {
            ...rates[co],
            rate: rates[co].percentage/rates[co].count
        };
    }

    console.log(rates);

    return rates;
}