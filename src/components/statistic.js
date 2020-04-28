import {createElement} from "src/utils.js";

const createStatisticsTemplate = (count = 0) => {
  return `<p>${count} movies inside</p>`;
};

export default class Statistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
