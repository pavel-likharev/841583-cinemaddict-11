import {render, RenderPosition, remove} from 'src/utils/render.js';
import FilmsListComponent from 'src/components/films-list.js';
import FilmsListExtraComponent from 'src/components/films-list-extra.js';
import ShowMoreButtonComponent from 'src/components/show-more-button.js';
import BaseSortingComponent, {SortType} from 'src/components/base-sorting.js';
import FilmController from 'src/controllers/film.js';

const EXTRA_CARDS_COUNT = 2;
const CARDS_RENDER_STEP = 5;
const CARDS_RENDER_ON_START = 5;

const renderFilmCards = (filmListElement, filmCards, onDataChange, onViewChange) => {
  return filmCards.map((filmCard) => {
    const filmController = new FilmController(filmListElement, onDataChange, onViewChange);

    filmController.render(filmCard);

    return filmController;
  });
};

const getSortedFilmCards = (filmCards, sortType, from, to) => {
  let sortedCards = [];
  const showingCards = filmCards.slice();

  switch (sortType) {
    case SortType.RATING:
      sortedCards = showingCards.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DATE:
      sortedCards = showingCards.sort((a, b) => b.year - a.year);
      break;
    case SortType.DEFAULT:
      sortedCards = showingCards;
      break;
  }

  return sortedCards.slice(from, to);
};
export default class PageController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._filmCards = [];
    this._showedFilmCardsControllers = [];
    this._showingCardsCount = CARDS_RENDER_ON_START;

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
    const filmCards = this._filmsModel.getFilms();
    const siteMainElement = document.querySelector(`.main`);

    render(siteMainElement, this._baseSortingComponent, RenderPosition.AFTERBEGIN);
    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderFilms(filmCards.slice(0, this._showingCardsCount));

    this._renderShowMoreButtonElement();
  }

  renderExtraBoard(nameBoard, filmCards) {
    this._filmCards = filmCards;

    const extraBoardComponent = new FilmsListExtraComponent(nameBoard);
    const filmsListContainerElement = extraBoardComponent.getElement().querySelector(`.films-list__container`);

    let showingCardsCount = EXTRA_CARDS_COUNT;

    renderFilmCards(filmsListContainerElement, this._filmCards.slice(0, showingCardsCount));

    const container = this._container.getElement();

    render(container, extraBoardComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(films) {
    const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

    const newFilmCards = renderFilmCards(filmsListContainerElement, films, this._onDataChange, this._onViewChange);
    this._showedFilmCardsControllers = this._showedFilmCardsControllers.concat(newFilmCards);

    this._showingCardsCount = this._showedFilmCardsControllers.length;
  }

  _renderShowMoreButtonElement() {
    remove(this._showMoreButtonComponent);

    if (this._showingCardsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    const container = this._filmsListComponent.getElement();

    render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _removeFilms() {
    this._showedFilmCardsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmCardsControllers = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowMoreButtonElement();
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._filmCards.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._filmCards = [].concat(this._filmCards.slice(0, index), newData, this._filmCards.slice(index + 1));

    filmController.render(this._filmCards[index]);
  }

  _onViewChange() {
    this._showedFilmCardsControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingCardsCount = CARDS_RENDER_ON_START;

    const oldFilter = document.querySelector(`.sort__button--active`);
    oldFilter.classList.remove(`sort__button--active`);

    const newFilter = document.querySelector(`[data-sort-type=${sortType}]`);
    newFilter.classList.add(`sort__button--active`);

    const sortedCards = getSortedFilmCards(this._filmCards, sortType, 0, this._showingCardsCount);
    const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

    filmsListContainerElement.innerHTML = ``;
    remove(this._showMoreButtonComponent);

    const newFilmCards = renderFilmCards(filmsListContainerElement, sortedCards, this._onDataChange, this._onViewChange);
    this._showedFilmCardsControllers = newFilmCards;

    this._renderShowMoreButtonElement();
  }

  _onShowMoreButtonClick() {
    const prevCardsCount = this._showingCardsCount;
    const films = this._filmsModel.getFilms();

    this._showingCardsCount = this._showingCardsCount + CARDS_RENDER_STEP;

    const sortedFilmCards = getSortedFilmCards(films, this._baseSortingComponent.getSortType(), prevCardsCount, this._showingCardsCount);

    this._renderFilms(sortedFilmCards);

    if (this._showingCardsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateFilms(CARDS_RENDER_ON_START);
  }
}
