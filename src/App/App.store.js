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
    entries: [_.cloneDeep(dummyEntry)],
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

  setSelectedDate = index => {
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

  pushEntry = entry => {
    console.log(JSON.stringify(entry));
    this.data[this.selected].entries.push(_.cloneDeep(entry));
    db.entries.post({
      batch: this.data[this.selected].batch,
      ..._.cloneDeep(entry),
    });
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
  setSelectedDate: action,
  pushBatch: action,
  pushEntry: action,
  setEntrySelected: action,
  setData: action
});

export default new AppStore();
