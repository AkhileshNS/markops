import firebase from './firebase';

// Predefined Constants
export const rowSeperator = "|", // row seperator "1=0::3:::|2=::::::"
hdSeperator = "=", // header-data seperator "1=0::3:::"
dataSeperator = ":"; // data seperator "0::3:::"

// Database Functions: for get operations 1 - Node doesn't exist, 2 - Unknown error (Possibly network)
export const getDepartments = (res, rej) => {
    firebase.database().ref("departments").once('value')
    .then(snap => {
        if (snap.exists()) {
            res(snap.val());
        } else {
            rej("Departments node does not exist", 1);
        }
    })
    .catch(err => rej("There was an error getting department data: " + err, 2));
}

export const getSubjectRatios = (subj, res, rej) => {
    firebase.database().ref(`subjects/${subj}/data`).once('value')
    .then(snap => {
        if (snap.exists()) {
            res(getTableFromString(snap.val()));
        } else {
            rej("Subjects node does not exist", 1);
        }
    })
    .catch(err => rej("There was an error getting subject CO/PO data: " + err, 2));
}

export const getDepartmentName = (dep, res, rej) => {
    firebase.database().ref(`departments/${dep}/name`).once('value')
    .then(snap => {
        if (snap.exists()) {
            res(snap.val());
        } else {
            rej("department's name node does not exist", 1);
        }
    })
    .catch(err => rej("There was an error getting department name: " + err, 2));
}

export const getSubjectName = (subj, res, rej) => {
    firebase.database().ref(`subjects/${subj}/name`).once('value')
    .then(snap => {
        if (snap.exists()) {
            res(snap.val());
        } else {
            rej("department's name node does not exist", 1);
        }
    })
    .catch(err => rej("There was an error getting subject name: " + err, 2));
}

export const getTableConfig = (path, res, rej) => {
    firebase.database().ref(`tables/${path}/config`).once('value')
    .then(snap => {
        if (snap.exists()) {
            res(getArrObjFromConfig(snap.val()));
        } else {
            rej("table node does not exist", 1);
        }
    })
    .catch(err => rej("There was an error getting table config: " + err, 2));
}

export const getTableValues = (path, res, rej) => {
    console.log()
    firebase.database().ref(`tables/${path}/data`).once('value')
    .then(snap => {
        if (snap.exists()) {
            res(getNestedArrFromTable(snap.val()));
        } else {
            rej("table node doesn't exist", 1);
        }
    }).catch(err => rej("There was an error getting table values: " + err, 2))
}

export const setDepartments = (deps, res, rej) => {
    firebase.database().ref("departments").set(deps, err => {
        if (err) {
            rej("There was an error setting departments", 1);
        } else {
            res("Successfully set departments");
        }
    });
}

export const setSubjectRatios = (subj, value, res, rej) => {
    firebase.database().ref(`subjects/${subj}/data`).set(getStringFromTable(value), err => {
        if (err) {
            rej("There was error setting the value to the subject", 1);
        } else {
            res("Successfully set value to the subject");
        }
    });
}

export const setTableConfig = (path, value, res, rej) => {
    firebase.database().ref(`tables/${path}/config`).set(getConfigFromArrObj(value), err => {
        if (err) {
            rej("There was error setting the value to the table: " + err, 1);
        } else {
            res("Successfully set value to the table");
        }
    });
}

export const setTableValues = (path, value, res, rej) => {
    firebase.database().ref(`tables/${path}/data`).set(getTableFromNestedArr(value), err => {
        if (err) {
            rej("There was error setting the value to the table: " + err, 1);
        } else {
            res("Successfully set value to the table");
        }
    });
}

// Utility Functions
export const getTableFromString = (str) => { // str = "1=:::::::::::|2=:::::::::::|..."
    let table = [];

    let rows = str.split(rowSeperator); // rows = ["1=:::::::::::", ...]
    for (let row of rows) {
        let [header, data] = row.split(hdSeperator); // header = "1", data = ":::::::::::"
        table.push(["CO" + header + "|h", ...data.split(dataSeperator)]);
    }

    if (table.length>0) {
        let headers = ["CO/PO"];
        for (let i=1; i<table[0].length; i++) {headers.push("PO" + i + "|h");}
        table.unshift(headers);
    }

    return table;
}

export const getStringFromTable = table => { // table = [["CO/PO","PO1"...],["CO1","","","","", ...], ...]
    let strArray = [];
    
    for (let i=1; i<table.length; i++) {
        let row = [];
        for (let j=1; j<table[i].length; j++) {
            row.push(table[i][j]);
        }
        strArray.push(i + hdSeperator + row.join(dataSeperator));
    }

    return strArray.join(rowSeperator);
}

/* 
    config = {
      "test 1": {
        _id: 1
        Q1A: "1:1:10",
        Q1B: "1:2:10"
      }
    }
*/
export const getArrObjFromConfig = config => { 
    const arrObj = {};
    let tests = Object.keys(config).sort(function(a,b){return config[a]._id-config[b]._id});

    for (let test of tests) {
        arrObj[test] = [];
        
        for (let question in config[test]) {
            if (question!=="_id") {
                let Question = question.slice(1);
                arrObj[test].push(Question + ":" + config[test][question]);
            }
        }
    }
    return arrObj;
}

/*
    arrObj = {
        "test 1": ["1A:1:1:10","1B:1:2:10"]
    }
*/
export const getConfigFromArrObj = arrObj => {
    const config = {}
    let i = 0;
    for (let test in arrObj) {
        config[test] = {
            _id: ++i
        };

        for (let value of arrObj[test]) {
            let [question, CO, PO, max] = value.split(":");
            config[test]["Q" + question] = CO + ":" + PO + ":" + max;
        }
    }
    return config;
}

/* 
    "1BM16IS009": {
        "test 1": {
            _id: 1,
            Q1A: "8.7",
            Q1B: "8.3"
        }
    }
*/
export const getNestedArrFromTable = table => {
    let nestedArr = [];

    for (let roll in table) {
        let arr = [];
        arr.push(roll);

        let tests = Object.keys(table[roll]).sort((a,b) => (table[roll][a]._id - table[roll][b]._id));
        for (let test of tests) {
            for (let key in table[roll][test]) {
                if (key!=="_id") {
                    arr.push(table[roll][test][key]);
                }
            }
        }

        nestedArr.push(arr);
    }

    return nestedArr;
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
        ["Test","test|e6"],
        ["PO","1"],
        ["CO","1"],
        ["Qname","1A"],
        ["Max","10"],
        ["1BM16IS009","8.7"]
    ]
*/
export const getTableFromNestedArr = nestedArr => {
    let table = {};
    nestedArr[0] = expandArr(nestedArr[0]);
    for (let i=5; i<nestedArr.length; i++) {
        let id = 1;
        let roll = nestedArr[i][0];
        if (roll!=="") {
            table[roll] = {};
            for (let j=1; j<nestedArr[i].length; j++) {
                if (!(nestedArr[0][j] in table[roll])) {
                    table[roll][nestedArr[0][j]] = {
                        _id: id++
                    };
                }
                table[roll][nestedArr[0][j]]["Q" + nestedArr[3][j].split("|")[0]] = nestedArr[i][j];
                console.log(table);
            }
        }
    }
    return table;
}
