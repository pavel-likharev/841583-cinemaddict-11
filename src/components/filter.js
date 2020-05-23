import AbstractComponent from 'src/components/abstract-component.js';

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<a id="${name}" href="#${name}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">${name !== `all` ? name[0].toUpperCase() + name.slice(1) : name[0].toUpperCase() + name.slice(1) + ` movies`} 
    ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = evt.target.id;
      handler(filterName);
    });
  }
}
