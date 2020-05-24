import {render, RenderPosition, remove} from 'src/utils/render.js';
import FilmsListComponent from 'src/components/films-list.js';
// import FilmsListExtraComponent from 'src/components/films-list-extra.js';
import ShowMoreButtonComponent from 'src/components/show-more-button.js';
import BaseSortingComponent, {SortType} from 'src/components/base-sorting.js';
import FilmController from 'src/controllers/film.js';

// const EXTRA_FILMS_COUNT = 2;
const FILMS_RENDER_STEP = 5;
const FILMS_RENDER_ON_START = 5;

const renderFilms = (filmListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmController = new FilmController(filmListElement, onDataChange, onViewChange);

    filmController.render(film, film.comments);

    return filmController;
  });
};

const attachCommentsToFilm = (films, comments) => {
  films.forEach((film, index) => {
    const thisFilmComments = comments[index];

    film.comments = thisFilmComments;
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};
export default class PageController {
  constructor(container, filmsModel, commentsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;

    this._films = [];
    this._showedFilmsControllers = [];
    this._showingFilmsCount = FILMS_RENDER_ON_START;

    this._baseSortingComponent = new BaseSortingComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._baseSortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  renderBoard() {
    const container = this._container.getElement();
    const films = this._filmsModel.getFilms();
    const comments = this._commentsModel.getComments();
    const siteMainElement = document.querySelector(`.main`);

    attachCommentsToFilm(films, comments);

    render(siteMainElement, this._baseSortingComponent, RenderPosition.AFTERBEGIN);
    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, this._showingFilmsCount));

    this._renderShowMoreButtonElement();
  }

  // renderExtraBoard(nameBoard, films) {
  //   this._films = films;

  //   const extraBoardComponent = new FilmsListExtraComponent(nameBoard);
  //   const filmsListContainerElement = extraBoardComponent.getElement().querySelector(`.films-list__container`);

  //   let showingFilmsCount = EXTRA_FILMS_COUNT;

  //   renderFilms(filmsListContainerElement, this._films.slice(0, showingFilmsCount));

  //   const container = this._container.getElement();

  //   render(container, extraBoardComponent, RenderPosition.BEFOREEND);
  // }

  _renderFilms(films) {
    const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

    const newFilms = renderFilms(filmsListContainerElement, films, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    this._showingFilmsCount = this._showedFilmsControllers.length;
  }

  _renderShowMoreButtonElement() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    const container = this._filmsListComponent.getElement();

    render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmsControllers = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowMoreButtonElement();
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = FILMS_RENDER_ON_START;

    const oldSorting = document.querySelector(`.sort__button--active`);
    oldSorting.classList.remove(`sort__button--active`);

    const newSorting = document.querySelector(`[data-sort-type=${sortType}]`);
    newSorting.classList.add(`sort__button--active`);

    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), sortType, 0, this._showingFilmsCount);
    const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

    filmsListContainerElement.innerHTML = ``;

    this._removeFilms();
    this._renderFilms(sortedFilms);

    this._renderShowMoreButtonElement();
  }

  _onShowMoreButtonClick() {
    const prevFilmsCount = this._showingFilmsCount;
    const films = this._filmsModel.getFilms();

    this._showingFilmsCount = this._showingFilmsCount + FILMS_RENDER_STEP;

    const sortedFilms = getSortedFilms(films, this._baseSortingComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);

    this._renderFilms(sortedFilms);

    if (this._showingFilmsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateFilms(FILMS_RENDER_ON_START);
  }
}
