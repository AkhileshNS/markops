import { decorate, observable, action } from 'mobx';

class AppStore {
  trigger = false;
  currRoute = '/all';

  startTrigger = () => (this.trigger = true);

  setRoute = route => {
    if (
      Object.prototype.toString.call(route).toLowerCase() === '[object string]'
    ) {
      this.currRoute = route;
    }
  };
}

decorate(AppStore, {
  trigger: observable,
  currRoute: observable,

  startTrigger: action,
  setRoute: action
});

export default new AppStore();
