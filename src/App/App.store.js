import { decorate, observable, action } from 'mobx';

class AppStore {
  trigger = false;
  currRoute = '/all';
  data = [];
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

  pushEntry = entry => {
    if (
      Object.prototype.toString.call(entry).toLowerCase() === "[object string]"
    ) {
      this.data.push({
        name: entry
      });
    }
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
  pushEntry: action
});

export default new AppStore();
