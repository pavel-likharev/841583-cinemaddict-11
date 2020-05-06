import AbstractComponent from 'src/components/abstract-component.js';

const createBoardFilmsTemplate = () => {
  return `<section class="films"></section>`;
};

export default class BoardFilms extends AbstractComponent {
  getTemplate() {
    return createBoardFilmsTemplate();
  }
}
