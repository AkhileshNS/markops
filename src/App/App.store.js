// External Modules
import { decorate, observable, action } from 'mobx';
import _ from 'lodash';

// Global Dummy Entry
import { dummyEntry } from 'global/dummy';

class AppStore {
  trigger = false;
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
    this.data[this.selected].entries.push(entry);
  }

  setEntrySelected = selected => {
    this.data[this.selected].selected = selected;
  }
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
  setEntrySelected: action
});

export default new AppStore();
