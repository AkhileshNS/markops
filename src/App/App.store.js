import { decorate, observable, action } from "mobx";

class AppStore {
  trigger = false;
  currRoute = "Home";

  startTrigger = () => this.trigger = true;

  setRoute = route => this.currRoute = route;
}

decorate(AppStore, {
  trigger: observable,
  currRoute: observable,

  startTrigger: action,
  setRoute: action
});

export default new AppStore();