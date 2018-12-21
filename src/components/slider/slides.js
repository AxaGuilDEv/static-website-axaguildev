import $ from '../../commons/js/selector';
import fetchJson from '../../commons/js/fetchJson';
import { defaultClass } from './slider.contants';
import { apiRepos, apiByType } from '../github/github';
import { prefix } from '../../data/base.json';

import Slider from './slider';
import Contributors from '../contributors/contributors';

const contributors = new Contributors();
const slider = new Slider(contributors);

const { classRepository, classNameSlideContainer, templateClass } = defaultClass;
const setTextContent = cloneTemplate => (className, content) => {
  const cloneElt = cloneTemplate.querySelector(`.${className}`);
  cloneElt.textContent = `${content}`;
};

const isToolkitReactRepository = repository => repository.name === 'react-toolkit';

const createLink = (label, title, href, target = '_blank') => {
  const link = document.createElement('a');
  const linkText = document.createTextNode(label);
  link.appendChild(linkText);
  link.title = title;
  link.href = href;
  link.target = target;
  link.className = `${prefix}-list__link`;
  return link;
};

const addDemosLinkForToolkitReact = (tags, cloneTemplate) => {
  const listDemos = document.createElement('ul');
  listDemos.className = `${prefix}-list`;
  tags.forEach((tag) => {
    const itemList = document.createElement('li');
    itemList.className = `${prefix}-list__item`;
    const itemLinkStorybook = createLink(
      'React Storybook',
      'See React Storybook',
      `https://axaguildev.github.io/react-toolkit/storybook/${tag.name}/index.html`,
    );
    const itemLinkDesignSystem = createLink(
      'Design System',
      'See Design System',
      `https://axaguildev.github.io/react-toolkit/design/${tag.name}/index.html`,
    );
    const itemListContent = document.createTextNode(`[${tag.name}]`);
    itemList.appendChild(itemLinkDesignSystem);
    itemList.appendChild(itemLinkStorybook);
    itemList.appendChild(itemListContent);
    listDemos.appendChild(itemList);
  });
  const cloneElt = cloneTemplate.querySelector(`.${classRepository.description}`);
  cloneElt.appendChild(listDemos);
};

class Slides {
  synchronize() {
    this.slidesNode = $(classNameSlideContainer);
    this.getCurrentActive();
    this.getRepos();
  }

  getCurrentActive() {
    this.activeSlide = $(classRepository.item);
    this.activeId = Number(this.activeSlide.getAttribute('data-id'));
    this.activeSlide.classList.add(`${prefix}-slider__list-item--synchronize`);
  }

  clearSlidesNode() {
    this.slidesNode.innerHTML = '';
  }

  async getRepos() {
    this.repositories = await fetchJson(apiRepos);
    this.getTemplate();
    this.clearSlidesNode();
    this.repositoriesSynchronized = await Promise.all(this.addRepos());
    slider.init();
    contributors.init();
  }

  addRepos() {
    return this.repositories.map(async (repository) => {
      const cloneTemplate = document.importNode(this.template.content, true);

      setTextContent(cloneTemplate)(classRepository.description, repository.description);

      const tags = await fetchJson(apiByType(repository.name)('tags'));
      if (tags.length) {
        setTextContent(cloneTemplate)(classRepository.version, tags[0].name);
      }
      if (isToolkitReactRepository(repository)) {
        addDemosLinkForToolkitReact(tags, cloneTemplate);
      }

      this.setCloneItem(cloneTemplate, repository);
      setTextContent(cloneTemplate)(classRepository.title, repository.name);
      setTextContent(cloneTemplate)(classRepository.stars, repository.stargazers_count);

      const cloneMore = cloneTemplate.querySelector(`.${classRepository.more}`);
      cloneMore.setAttribute('href', repository.homepage);

      this.slidesNode.appendChild(cloneTemplate);
      return cloneTemplate;
    });
  }

  setCloneItem(cloneTemplate, repository) {
    const cloneItem = cloneTemplate.querySelector(`.${classRepository.item}`);
    if (this.isActiveRepository(repository.id)) {
      cloneItem.classList.add(classRepository.itemActive);
    }
    cloneItem.setAttribute('data-id', `${repository.id}`);
    cloneItem.setAttribute('data-repo', repository.name);
  }

  isActiveRepository(id) {
    return Number(id) === this.activeId;
  }

  getTemplate() {
    this.template = $(templateClass);
  }
}

export default Slides;
