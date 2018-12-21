import { lory } from 'lory.js';
import $ from '../../commons/js/selector';
import { defaultClass, defaultOptions, eventsLory } from './slider.contants';

class Slider {
  constructor(contributors = {}, options = {}, classOptions = {}) {
    const newClassOptions = Object.assign(defaultClass, classOptions);
    const {
      classSlider,
      classNameFrame,
      classNameSlideContainer,
      classNamePrevCtrl,
      classNameNextCtrl,
      classNameActiveSlide,
    } = newClassOptions;
    const optionsSelectors = {
      classNameFrame,
      classNameSlideContainer,
      classNamePrevCtrl,
      classNameNextCtrl,
      classNameActiveSlide,
    };
    const optionsSlider = Object.assign(defaultOptions, optionsSelectors, options);
    this.slider = $(classSlider);
    this.optionsSlider = optionsSlider;
    this.contributors = contributors;
  }

  init() {
    if (this.isNotExitingElement()) {
      return;
    }
    if (this.hasContributors()) {
      this.slider.addEventListener(eventsLory.afterSlide, () => this.updateContributors());
    }
    lory(this.slider, this.optionsSlider);
  }

  hasContributors() {
    return this.contributors;
  }

  isNotExitingElement() {
    return !this.slider;
  }

  updateContributors() {
    this.contributors.init();
  }
}

export default Slider;
