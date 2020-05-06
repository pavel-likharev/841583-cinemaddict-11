import AbstractComponent from 'src/components/abstract-component.js';

const createStatisticsTemplate = (count = 0) => {
  return `<p>${count} movies inside</p>`;
};

export default class Statistics extends AbstractComponent {
  getTemplate() {
    return createStatisticsTemplate();
  }
}
