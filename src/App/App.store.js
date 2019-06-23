import { decorate, observable, action } from 'mobx';

class AppStore {
  trigger = false;
  currRoute = '/all';
  options = {
    dates: ['AY 2016-2017', 'AY 2017-2018', 'AY 2018-2019']
  };
  selected = {
    date: 0
  };

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
      this.selected.date = index;
    }
  };
}

decorate(AppStore, {
  trigger: observable,
  currRoute: observable,
  options: observable,
  selected: observable,

  startTrigger: action,
  setRoute: action,
  setSelectedDate: action
});

export default new AppStore();
