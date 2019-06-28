// External Modules
import { decorate, observable, action } from 'mobx';
import _ from 'lodash';

// Global Dummy Entry and Database
import { dummyEntry } from 'global/dummy';
import db from 'global/database';

class AppStore {
  trigger = true;
  currRoute = '/all';
  data = [{
    batch: "2016 Batch",
    entries: [],
    selected: -1
  }];
  selected = 0;

  startTrigger = () => (this.trigger = true);

  setRoute = route => {
    if (
      Object.prototype.toString.call(route).toLowerCase() === '[object string]'
    ) {
      this.currRoute = route;
    }
  };

  setSelected = index => {
    if (
      Object.prototype.toString.call(index).toLowerCase() === '[object number]'
    ) {
      this.selected = index;
    }
  };

  pushBatch = batch => {
    if (
      Object.prototype.toString.call(batch).toLowerCase() === "[object string]"
    ) {
      this.data.push({
        batch,
        entries: [],
        selected: -1
      });
    }
  }

  updateBatch = (batch, newBatch) => {
    let index = _.findIndex(this.data, {batch});
    if (index!==-1) {
      this.data[index].batch = newBatch;
      db.entries.updateBatch(batch, newBatch);
    } 
  }

  deleteBatch = batch => {
    if (
      Object.prototype.toString.call(batch).toLowerCase() === "[object string]"
    ) {
      let index = _.findIndex(this.data, {batch});
      if (index!==-1) {
        this.currRoute = "/all";
        this.data.splice(index, 1);
        db.entries.deleteByBatch(batch);
        if (this.selected>=index) {
          this.selected = -1;
        }
      }
    }
  }

  pushEntry = entry => {
    this.data[this.selected].entries.push(_.cloneDeep(entry));
    db.entries.post({
      batch: this.data[this.selected].batch,
      ..._.cloneDeep(entry),
    });
  }

  updateEntry = (courseCode, newEntry) => {
    let index = _.findIndex(this.data[this.selected].entries, {courseCode});
    if (index!==-1) {
      if ("courseCode" in newEntry) {
        this.data[this.selected].entries[index].courseCode = newEntry.courseCode; 
      }
      if ("courseName" in newEntry) {
        this.data[this.selected].entries[index].courseName = newEntry.courseName; 
      }
      if ("facultyName" in newEntry) {
        this.data[this.selected].entries[index].facultyName = newEntry.facultyName; 
      }
      if ("contOutputs" in newEntry) {
        this.data[this.selected].entries[index].contOutputs = newEntry.contOutputs; 
      }
      if ("avgOutputs" in newEntry) {
        this.data[this.selected].entries[index].avgOutputs = newEntry.avgOutputs; 
      }
      if ("mappingData" in newEntry) {
        this.data[this.selected].entries[index].mappingData = newEntry.mappingData; 
      }
      db.entries.updateEntry(this.data[this.selected].batch, courseCode, newEntry);
    }
  }

  deleteEntry = courseCode => {
    let index = _.findIndex(this.data[this.selected].entries, {courseCode: courseCode});
    if (index!==-1) {
      this.data[this.selected].entries.splice(index, 1);
      db.entries.deleteByEntry(this.data[this.selected].batch, courseCode);
    }
  }

  setEntrySelected = selected => {
    this.data[this.selected].selected = selected;
  }

  setData = data => this.data = _.cloneDeep(data);
}

decorate(AppStore, {
  trigger: observable,
  currRoute: observable,
  data: observable,
  selected: observable,

  startTrigger: action,
  setRoute: action,
  setSelected: action,
  pushBatch: action,
  updateBatch: action,
  deleteBatch: action,
  pushEntry: action,
  updateEntry: action,
  deleteEntry: action,
  setEntrySelected: action,
  setData: action
});

export default new AppStore();
