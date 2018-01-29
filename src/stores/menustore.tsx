import { observable, action } from 'mobx';

class MenuStore {
  @observable isMenuExpanded: boolean = false;

  @observable isSidebarVisible: boolean = false;

  constructor() {
    this.isMenuExpanded = false;
    this.isSidebarVisible = false;
  }

  @action
  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  @action
  toggleSidebarVisibility() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}

export default new MenuStore();