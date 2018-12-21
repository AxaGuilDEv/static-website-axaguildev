import Slides from './components/slider/slides';
import Menu from './components/menu/menu';

const slides = new Slides();
const menu = new Menu();

document.addEventListener('DOMContentLoaded', () => {
  slides.synchronize();
  menu.init();
});
