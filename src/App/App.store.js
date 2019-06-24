import { decorate, observable, action } from 'mobx';

class AppStore {
  trigger = false;
  currRoute = '/all';
  data = [{
    name: "AY 2018-2019",
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

  setSelectedDate = index => {
    if (
      Object.prototype.toString.call(index).toLowerCase() === '[object number]'
    ) {
      this.selected = index;
    }
  };

  pushFolder = folder => {
    if (
      Object.prototype.toString.call(folder).toLowerCase() === "[object string]"
    ) {
      this.data.push({
        name: folder,
        entries: [],
        selected: -1
      });
    }
  }

  pushEntry = entry => {
    console.log(entry);
    this.data[this.selected].entries.push(entry);
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
  pushFolder: action,
  pushEntry: action
});

export default new AppStore();
