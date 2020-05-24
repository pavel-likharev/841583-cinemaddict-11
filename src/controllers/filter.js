import FilterComponent from 'src/components/filter.js';
import {FilterType} from 'src/const.js';
import {render, replace, RenderPosition} from 'src/utils/render.js';
import {getFilmsByFilter} from "../utils/filter.js";


export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getFilmsAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _onFilterChange(filterType) {
    const oldFilterElement = this._filterComponent.getElement().querySelector(`#${this._activeFilterType}`);
    oldFilterElement.classList.remove(`main-navigation__item--active`);

    const newFilterElement = this._filterComponent.getElement().querySelector(`#${filterType}`);
    newFilterElement.classList.add(`main-navigation__item--active`);

    const oldSorting = document.querySelector(`.sort__button--active`);
    oldSorting.classList.remove(`sort__button--active`);

    const newSorting = document.querySelector(`[data-sort-type=default]`);
    newSorting.classList.add(`sort__button--active`);

    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}

