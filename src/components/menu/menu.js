import $ from '../../commons/js/selector';
import { prefix } from '../../data/base.json';

const classOpenMenu = 'js-icon--menu-button';
const classCloseMenu = 'js-icon--close';
const modifier = 'opened';
const classMenu = `${prefix}-menu`;
const classOpened = `${classMenu}--${modifier}`;

class Menu {
  constructor() {
    this.menu = $(classMenu);
  }

  init() {
    if (this.isNotExitingElement()) {
      return;
    }
    this.initEvents();
  }

  initEvents() {
    $(classOpenMenu).addEventListener('click', () => this.onOpenMenu());
    $(classCloseMenu).addEventListener('click', () => this.onCloseMenu());
    window.onresize = () => this.onCloseMenu();
  }

  isNotExitingElement() {
    return !this.menu;
  }

  onOpenMenu() {
    this.menu.classList.add(classOpened);
  }

  onCloseMenu() {
    this.menu.classList.remove(classOpened);
  }
}

export default Menu;
