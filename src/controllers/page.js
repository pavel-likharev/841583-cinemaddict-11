import {render, RenderPosition, remove} from 'src/utils/render.js';
import FilmsListComponent from 'src/components/films-list.js';
import FilmsListExtraComponent from 'src/components/films-list-extra.js';
import FilmCardComponent from 'src/components/film-card.js';
import ShowMoreButtonComponent from 'src/components/show-more-button.js';
import BaseFiltersComponent, {SortType} from 'src/components/base-filters.js';
import FilmDetailsComponent from 'src/components/film-details.js';
import FilmDetailsContainerComponent from 'src/components/film-details-container.js';
import CommentsComponent from 'src/components/comments.js';

const EXTRA_CARDS_COUNT = 2;
const CARDS_RENDER_STEP = 5;
const CARDS_RENDER_ON_START = 5;

const KEY_CODE_ESC = 27;

const renderFilmCard = (cardListElement, card) => {
  const onEscKeyDown = (evt) => {
    if (evt.keyCode === KEY_CODE_ESC) {
      evt.preventDefault();
      unrenderFilmDetailsPopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const renderFilmDetailsPopup = () => {
    unrenderFilmDetailsPopup();

    const filmDetailsWrapperElement = filmDetailsContainerComponent.getElement().querySelector(`.film-details__inner`);

    render(siteBodyElement, filmDetailsContainerComponent, RenderPosition.BEFOREEND);
    render(filmDetailsWrapperElement, filmDetailsComponent, RenderPosition.BEFOREEND);
    render(filmDetailsWrapperElement, commentsComponent, RenderPosition.BEFOREEND);

    siteBodyElement.classList.add(`hide-overflow`);
  };

  const unrenderFilmDetailsPopup = () => {
    const filmDetailsElement = document.querySelector(`.film-details`);
    if (filmDetailsElement) {
      filmDetailsElement.remove();
      siteBodyElement.classList.remove(`hide-overflow`);
    }
  };

  const siteBodyElement = document.querySelector(`body`);
  const filmCardComponent = new FilmCardComponent(card);
  const filmDetailsContainerComponent = new FilmDetailsContainerComponent();
  const filmDetailsComponent = new FilmDetailsComponent(card);
  const commentsComponent = new CommentsComponent(card);

  filmCardComponent.setKitElementsClickHandler(() => {
    renderFilmDetailsPopup(card);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmDetailsComponent.setCloseButtonClickHandler(() => {
    unrenderFilmDetailsPopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(cardListElement, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderFilmCards = (filmListElement, filmCards) => {
  filmCards.forEach((filmCard) => {
    renderFilmCard(filmListElement, filmCard);
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

    this._baseFiltersComponent = new BaseFiltersComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  renderBoard(filmCards) {
    const renderShowMoreButtonElement = () => {
      if (shownCardsCount >= filmCards.length) {
        return;
      }

      render(filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevCardsCount = shownCardsCount;
        shownCardsCount = shownCardsCount + CARDS_RENDER_STEP;

        const nextPackCards = getSortedFilmCards(filmCards, this._baseFiltersComponent.getSortType(), prevCardsCount, shownCardsCount);

        renderFilmCards(filmsListContainerElement, nextPackCards);

        if (shownCardsCount >= filmCards.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const siteMainElement = document.querySelector(`.main`);
    render(siteMainElement, this._baseFiltersComponent, RenderPosition.AFTERBEGIN);

    const container = this._container.getElement();

    const filmsListComponent = new FilmsListComponent();
    const filmsListContainerElement = filmsListComponent.getElement().querySelector(`.films-list__container`);
    let shownCardsCount = CARDS_RENDER_ON_START;

    renderFilmCards(filmsListContainerElement, filmCards.slice(0, shownCardsCount));
    render(container, filmsListComponent, RenderPosition.BEFOREEND);

    renderShowMoreButtonElement();

    this._baseFiltersComponent.setSortTypeChangeHandler((sortType) => {
      shownCardsCount = CARDS_RENDER_ON_START;
      const sortedCards = getSortedFilmCards(filmCards, sortType, 0, shownCardsCount);

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
    const extraBoardComponent = new FilmsListExtraComponent(nameBoard);
    const filmsListContainerElement = extraBoardComponent.getElement().querySelector(`.films-list__container`);

    let shownCardsCount = EXTRA_CARDS_COUNT;

    renderFilmCards(filmsListContainerElement, filmCards.slice(0, shownCardsCount));

    const container = this._container.getElement();

    render(container, extraBoardComponent, RenderPosition.BEFOREEND);
  }
}