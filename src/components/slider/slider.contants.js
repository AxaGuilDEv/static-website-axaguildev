const defaultClass = {
  classSlider: 'js-slider',
  classNameFrame: 'js-slider__frame',
  classNameSlideContainer: 'js-slider__list',
  classSliderListItem: 'js-slider__list-item',
  classNamePrevCtrl: 'js-slider__prev',
  classNameNextCtrl: 'js-slider__next',
  classNameActiveSlide: 'js-slider__list-item--active',
  templateClass: 'js-slideTmpl',
  classRepository: {
    title: 'js-title--repo-title',
    version: 'js-title--repo-version',
    stars: 'js-title--star',
    description: 'js-repo__intro',
    item: 'js-slider__list-item',
    itemActive: 'js-slider__list-item--active',
    more: 'js-more--repo',
  },
};

const defaultOptions = {
  infinite: 1,
  enableMouseEvents: true,
};

const eventsLory = {
  beforeSlide: 'before.lory.slide',
  afterSlide: 'after.lory.slide',
};

export { defaultClass, defaultOptions, eventsLory };
