// External Modules
import _ from 'lodash';

/* 
  Steps to get CO and PO percentage:-
  1) Filter out all unnecessary values
  2) Creating a mapping table
*/

/* 
  i/p: [
    [null, null, "BMS COllege of Engineering", null],
    ["markops","test1", null, null, "test2", null, null],
    ["Program Outcome", 1, 1, "1&2"],
    ["Course Outcome", 1, 1, "1&2"],
    ["END"]
  ]
  o/p: [
    ["markops", "test1", "test1", "test1", "test2", "test2", "test2"],
    ["Program Outcome", "1", "1", "1,2"],
    ["Course Outcome", "1", "1", "1,2"]
  ]
*/
export const filterData = fileData => {
  let res = [], resStart = -1, resEnd = -1;

  for (let i = 0; i < fileData.length; i++) {
    if (typeof fileData[i][0] === 'string' && fileData[i][0].toLowerCase() === 'markops') {
      resStart = i;
    }
    if (typeof fileData[i][0] === 'string' && fileData[i][0].toLowerCase() === 'end') {
      resEnd = i;
      break;
    }
  }

  if (resStart!==-1 && resEnd!==-1) {
    res = _.cloneDeep(fileData).slice(resStart, resEnd);

    let lastString = "markops";
    for (let i=0; i<res[0].length; i++) {
      if (res[0][i]!==null) {
        lastString = res[0][i];
      }
      if (res[0][i]===null && lastString!=="markops") {
        res[0][i] = lastString;
      }
    }

    
    for (let j=1; j<res[2].length; j++) {
      if (typeof res[1][j] === "number") {
        res[1][j] = String(res[1][j]);
      }

      if (typeof res[1][j] === "string" && res[1][j].includes("&")) {
        res[1][j] = res[1][j].replace("&",",");
      } 
    }

    return res;
  }

  return res;
};

/*
  type 1: Count Attainment 
  type 2: Average Attainment
*/
export const mapCO = (filteredFileData, type) => {
  let outputs = [];

  for (let j=1; j<filteredFileData[0].length; j++) {
    let attempted = 0;
    let registered = 0;
    let attained = 0;
    let attainedValue = 0;

    for (let i=4; i<filteredFileData.length; i++) {
      if (filteredFileData[i][j]!==null) {
        if (filteredFileData[i][j]>=(0.7*filteredFileData[3][j])) {
          attained++;
          attainedValue += filteredFileData[i][j];
        }
        attempted++;
      }
      registered++;
    }

    registered = registered===0 ? 1 : registered;
    attempted = attempted===0 ? 1 : attempted;

    let COs = filteredFileData[1][j].includes(",") ? filteredFileData[1][j].split(",") : [filteredFileData[1][j]];
    for (let i=0; i<COs.length; i++) {
      let isAdded = false;
      let total = type===1 ? (attained/registered) * 100 : (attainedValue/attempted) * 10;
      for (let j=0; j<outputs.length; j++) {
        if (`Course outcome ${COs[i]}`===outputs[j].CO) {
          outputs[j].total += total;
          outputs[j].count++;
          outputs[j].percentage = outputs[j].total/outputs[j].count;
          isAdded = true;
        }
      }
      if (!isAdded) {
        outputs.push({
          CO: `Course outcome ${COs[i]}`,
          total,
          count: 1,
          percentage: total
        });
      }
    }
  }

  return outputs;
}

export const getStats = fileData => {
  let res = filterData(_.cloneDeep(fileData));
  if (res.length===0) {
    return {contOutputs: [], avgOutputs: []};
  }

  let contOutputs = mapCO(_.cloneDeep(res), 1);
  let avgOutputs = mapCO(_.cloneDeep(res), 2);

  const sortOutputs = ({CO: co1},{CO: co2}) => parseInt(co1.match(/\d+/)[0]) - parseInt(co2.match(/\d+/)[0]);

  contOutputs.sort(sortOutputs);
  avgOutputs.sort(sortOutputs);

  return {contOutputs, avgOutputs};
};


export const filterMapping = mappingData => {
  let res = [], resI = -1, resJ = -1;
  for (let i=0; i<mappingData.length; i++) {
    if (typeof mappingData[i][0] === "string" && mappingData[i][0].trim().toLowerCase()==="markops") {
      resI = i;
    } else if (typeof mappingData[i][0] === "string" && mappingData[i][0].trim().toLowerCase()==="end") {
      resJ = i;
    }
  }
  
  if (resI>=0 && resJ>=0) {
    res = mappingData.slice(resI, resJ);

    for (let i=1; i<res.length; i++) {
      res[i][0] = res[i][0].replace(/co/i, "Course outcome ");
    }

    for (let j=1;j<res[0].length; j++) {
      res[0][j] = res[0][j].replace(/po/i, "Program outcome ");
    }

    return res;
  }

  return res;
}            