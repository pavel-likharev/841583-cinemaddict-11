import {render, RenderPosition, remove} from 'src/utils/render.js';
import FilmsListComponent from 'src/components/films-list.js';
import FilmsListExtraComponent from 'src/components/films-list-extra.js';
import ShowMoreButtonComponent from 'src/components/show-more-button.js';
import BaseFiltersComponent, {SortType} from 'src/components/base-filters.js';
import MovieController from 'src/controllers/movie.js';

const EXTRA_CARDS_COUNT = 2;
const CARDS_RENDER_STEP = 5;
const CARDS_RENDER_ON_START = 5;

const renderFilmCards = (filmListElement, filmCards, onDataChange, onViewChange) => {
  return filmCards.map((filmCard) => {
    const movieController = new MovieController(filmListElement, onDataChange, onViewChange);

    movieController.render(filmCard);

    return movieController;
  });
};

const getSortedFilmCards = (filmCards, sortType, from, to) => {
  let sortedCards = [];
  const shownCards = filmCards.slice();

  switch (sortType) {
    case SortType.RATING:
      sortedCards = shownCards.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DATE:
      sortedCards = shownCards.sort((a, b) => b.year - a.year);
      break;
    case SortType.DEFAULT:
      sortedCards = shownCards;
      break;
  }

  return sortedCards.slice(from, to);
};
export default class PageController {
  constructor(container) {
    this._container = container;
    this._filmCards = [];
    this._showedFilmCardsControllers = [];
    this._shownCardsCount = CARDS_RENDER_ON_START;

    this._baseFiltersComponent = new BaseFiltersComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  renderBoard(filmCards) {
    this._filmCards = filmCards;
    const renderShowMoreButtonElement = () => {
      if (this._shownCardsCount >= filmCards.length) {
        return;
      }

      render(filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevCardsCount = this._shownCardsCount;
        this._shownCardsCount = this._shownCardsCount + CARDS_RENDER_STEP;

        const nextPackCards = getSortedFilmCards(filmCards, this._baseFiltersComponent.getSortType(), prevCardsCount, this._shownCardsCount);

        renderFilmCards(filmsListContainerElement, nextPackCards);

        if (this._shownCardsCount >= filmCards.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const siteMainElement = document.querySelector(`.main`);
    render(siteMainElement, this._baseFiltersComponent, RenderPosition.AFTERBEGIN);

    const container = this._container.getElement();

    const filmsListComponent = new FilmsListComponent();
    const filmsListContainerElement = filmsListComponent.getElement().querySelector(`.films-list__container`);

    const newFilmCards = renderFilmCards(filmsListContainerElement, this._filmCards.slice(0, this._shownCardsCount), this._onDataChange, this._onViewChange);
    render(container, filmsListComponent, RenderPosition.BEFOREEND);

    this._showedFilmCardsControllers = this._showedFilmCardsControllers.concat(newFilmCards);
    renderShowMoreButtonElement();

    this._baseFiltersComponent.setSortTypeChangeHandler((sortType) => {
      this._shownCardsCount = CARDS_RENDER_ON_START;
      const sortedCards = getSortedFilmCards(filmCards, sortType, 0, this._shownCardsCount);

      const oldFilter = document.querySelector(`.sort__button--active`);
      oldFilter.classList.remove(`sort__button--active`);

      const newFilter = document.querySelector(`[data-sort-type=${sortType}]`);
      newFilter.classList.add(`sort__button--active`);

      filmsListContainerElement.innerHTML = ``;
      remove(this._showMoreButtonComponent);

      renderFilmCards(filmsListContainerElement, sortedCards);

      renderShowMoreButtonElement();
    });
  }

  renderExtraBoard(nameBoard, filmCards) {
    this._filmCards = filmCards;

    const extraBoardComponent = new FilmsListExtraComponent(nameBoard);
    const filmsListContainerElement = extraBoardComponent.getElement().querySelector(`.films-list__container`);

    let shownCardsCount = EXTRA_CARDS_COUNT;

    renderFilmCards(filmsListContainerElement, this._filmCards.slice(0, shownCardsCount));

    const container = this._container.getElement();

    render(container, extraBoardComponent, RenderPosition.BEFOREEND);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._filmCards.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._filmCards = [].concat(this._filmCards.slice(0, index), newData, this._filmCards.slice(index + 1));

    movieController.render(this._filmCards[index]);
  }

  _onViewChange() {
    this._showedFilmCardsControllers.forEach((it) => it.setDefaultView());
  }
}
