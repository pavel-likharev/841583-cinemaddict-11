import {render, createElement} from 'src/utils.js';
import {createRankUserTemplate} from 'src/components/rank-user.js';
import {createBaseFiltersTemplate} from 'src/components/base-filters.js';
import {createFilmsListTemplate} from 'src/components/films-list.js';
import {createFilmsListExtraTemplate} from 'src/components/films-list-extra.js';
import {createFilmsContainerTemplate} from 'src/components/films-container.js';
import {createMainNavTemplate} from 'src/components/main-nav.js';
import {createFilmCardTemplate} from 'src/components/film-card.js';
import {createShowMoreButtonTemplate} from 'src/components/show-more-button.js';
import {generateFilmCards} from 'src/mock/film-card.js';
import {createFilmDetailsTemplate} from 'src/components/film-details.js';
import {createStaticticsTemplate} from 'src/components/statistic';

const TOTAL_CARDS_COUNT = 17;
const EXTRA_CARDS_COUNT = 2;
const CARDS_RENDER_STEP = 5;

const BOARD_NAME_RATING = `Top rated`;
const BOARD_NAME_COMMENTED = `Most commented`;

// function
const createCardsRenderer = (containerElement, cards, step) => {
  let counter = 0;

  return {
    isRenderCompleted: () => counter >= cards.length,
    render: () => {
      const from = counter;
      const to = from + step;

      cards
        .slice(from, to)
        .forEach((card) => {
          const element = createElement(createFilmCardTemplate(card));
          render(containerElement, element, `beforeend`);
          element.addEventListener(`click`, () => renderFilmDetailsPopup(card));
          counter++;
        });
    },
  };
};

const handleDocumentKeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    unrenderFilmDetailsPopup();
  }
};

const renderFilmDetailsPopup = (card) => {
  const filmDetailsElement = createElement(createFilmDetailsTemplate(card));
  const filmDetailsCloseButtonElement = filmDetailsElement.querySelector(`.film-details__close-btn`);

  render(siteBodyElement, filmDetailsElement, `beforeend`);

  siteBodyElement.classList.add(`hide-overflow`);

  filmDetailsCloseButtonElement.addEventListener(`click`, () => unrenderFilmDetailsPopup());
  document.addEventListener(`keydown`, handleDocumentKeydown);
};

const unrenderFilmDetailsPopup = () => {
  const filmDetailsElement = document.querySelector(`.film-details`);
  if (filmDetailsElement) {
    filmDetailsElement.remove();

    siteBodyElement.classList.remove(`hide-overflow`);

    document.removeEventListener(`keydown`, handleDocumentKeydown);
  }
};

const renderBoardFilms = (containerElement) => {
  const buttonElement = createElement(createShowMoreButtonTemplate());
  const filmsListElement = createElement(createFilmsListTemplate());
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

  const cardsRenderer = createCardsRenderer(filmsListContainerElement, filmCards, CARDS_RENDER_STEP);

  cardsRenderer.render();

  render(filmsListElement, buttonElement, `beforeend`);
  render(containerElement, filmsListElement, `beforeend`);

  buttonElement.addEventListener(`click`, () => {
    cardsRenderer.render();
    if (cardsRenderer.isRenderCompleted()) {
      buttonElement.remove();
    }
  });
};

const renderExtraBoardFilms = (containerElement, nameBoard, filmCards) => {
  const extraBoardElement = createElement(createFilmsListExtraTemplate(nameBoard));
  const filmsListContainerElement = extraBoardElement.querySelector(`.films-list__container`);

  render(containerElement, extraBoardElement, `beforeend`);
  const cardsRenderer = createCardsRenderer(filmsListContainerElement, filmCards, EXTRA_CARDS_COUNT);
  cardsRenderer.render();
};

// data

const filmCards = generateFilmCards(TOTAL_CARDS_COUNT);
const topCommentsCards = filmCards.slice().sort((a, b) => b.countComments - a.countComments);
const topRatedCards = filmCards.slice().sort((a, b) => b.rating - a.rating);

const filmsInFiltersCount = {
  watchList: filmCards.filter((filmCard) => filmCard.watchList).length,
  history: filmCards.filter((filmCard) => filmCard.history).length,
  favorites: filmCards.filter((filmCard) => filmCard.favorites).length,
};

// main code

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, createElement(createRankUserTemplate()), `beforeend`);
render(siteMainElement, createElement(createMainNavTemplate(filmsInFiltersCount)), `beforeend`);
render(siteMainElement, createElement(createBaseFiltersTemplate()), `beforeend`);

const filmsContainerElement = createElement(createFilmsContainerTemplate());
render(siteMainElement, filmsContainerElement, `beforeend`);

renderBoardFilms(filmsContainerElement);
renderExtraBoardFilms(filmsContainerElement, BOARD_NAME_RATING, topRatedCards);
renderExtraBoardFilms(filmsContainerElement, BOARD_NAME_COMMENTED, topCommentsCards);

render(statisticsElement, createElement(createStaticticsTemplate(TOTAL_CARDS_COUNT)), `beforeend`);
