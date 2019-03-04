import firebase from './firebase';

// Predefined Constants
export const rowSeperator = "|", // row seperator "1=0::3:::|2=::::::"
hdSeperator = "=", // header-data seperator "1=0::3:::"
dataSeperator = ":"; // data seperator "0::3:::"

// Database Functions
export const getDepartments = (res, rej) => {
    firebase.database().ref("departments").once('value')
    .then(snap => {
        if (snap.exists()) {
            res(snap.val());
        } else {
            rej("Departments node does not exist");
        }
    })
    .catch(err => rej("There was an error getting department data: " + err));
}

export const getSubjectRatios = (subj, res, rej) => {
    firebase.database().ref("subjects/" + subj).once('value')
    .then(snap => {
        if (snap.exists()) {
            res(snap.val());
        } else {
            rej("Subjects node does not exist");
        }
    })
    .catch(err => rej("There was an error getting subject CO/PO data: " + err));
}

export const setSubjectRatios = (subj, value, res, rej) => {
    firebase.database().ref("subjects/" + subj).set(value, err => {
        if (err) {
            rej("There was error setting the value to the subject");
        } else {
            res("Successfully set value to the subject");
        }
    });
}

// Utility Functions
export const getTableFromString = (str) => { // str = "1=:::::::::::|2=:::::::::::|..."
    let table = [];

    let rows = str.split(rowSeperator); // rows = ["1=:::::::::::", ...]
    for (let row of rows) {
        let [header, data] = row.split(hdSeperator); // header = "1", data = ":::::::::::"
        table.push(["CO" + header + "|hd", ...data.split(dataSeperator)]);
    }

    if (table.length>0) {
        let headers = ["CO/PO"];
        for (let i=1; i<table[0].length; i++) {headers.push("PO" + i + "|hd");}
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