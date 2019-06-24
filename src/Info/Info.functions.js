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

    for (let i=1; i<3; i++) {
      for (let j=1; j<res[i].length; j++) {
        if (typeof res[i][j] === "number") {
          res[i][j] = String(res[i][j]);
        }

        if (typeof res[i][j] === "string" && res[i][j].includes("&")) {
          res[i][j] = res[i][j].replace("&",",");
        } 
      }
    }

    return res;
  }

  return res;
};

export const mapCOCont = filteredFileData => {
  let outputs = [];

  for (let j=1; j<filteredFileData[0].length; j++) {
    let registered = 0;
    let attained = 0;

    for (let i=5; i<filteredFileData.length; i++) {
      if (filteredFileData[i][j]!==null) {
        if (filteredFileData[i][j]>=(0.7*filteredFileData[4][j])) {
          attained++;
        }
      }
      registered++;
    }

    registered = registered===0 ? 1 : registered;

    let COs = filteredFileData[2][j].includes(",") ? filteredFileData[2][j].split(",") : [filteredFileData[2][j]];
    for (let i=0; i<COs.length; i++) {
      let isAdded = false;
      for (let j=0; j<outputs.length; j++) {
        if (`Course outcome ${COs[i]}`===outputs[j].CO) {
          outputs[j].total += (attained/registered) * 100;
          outputs[j].count++;
          outputs[j].percentage = outputs[j].total/outputs[j].count;
          isAdded = true;
        }
      }
      if (!isAdded) {
        outputs.push({
          PO: "",
          CO: `Course outcome ${COs[i]}`,
          total: (attained/registered) * 100,
          count: 1,
          percentage: (attained/registered) * 100
        });
      }
    }
  }

  return outputs;
}

export const mapCOAvg = filteredFileData => {
  let outputs = [];

  for (let j=1; j<filteredFileData[0].length; j++) {
    let attempted = 0;
    let attainedValue = 0;

    for (let i=5; i<filteredFileData.length; i++) {
      if (filteredFileData[i][j]!==null) {
        if (filteredFileData[i][j]>=(0.7*filteredFileData[4][j])) {
          attainedValue += filteredFileData[i][j];
        }
        attempted++;
      }
    }

    attempted = attempted===0 ? 1 : attempted;

    let COs = filteredFileData[2][j].includes(",") ? filteredFileData[2][j].split(",") : [filteredFileData[2][j]];
    for (let i=0; i<COs.length; i++) {
      let isAdded = false;
      for (let j=0; j<outputs.length; j++) {
        if (`Course outcome ${COs[i]}`===outputs[j].CO) {
          outputs[j].total += (attainedValue/attempted) * 10;
          outputs[j].count++;
          outputs[j].percentage = outputs[j].total/outputs[j].count;
          isAdded = true;
        }
      }
      if (!isAdded) {
        outputs.push({
          PO: "",
          CO: `Course outcome ${COs[i]}`,
          total: (attainedValue/attempted) * 10,
          count: 1,
          percentage: (attainedValue/attempted) * 10
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

  let contOutputs = mapCOCont(_.cloneDeep(res));
  let avgOutputs = mapCOAvg(_.cloneDeep(res));
  return {contOutputs, avgOutputs};
};
