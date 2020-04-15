import {render, createEventListenerAfterKeydownEcs, removeEventListenerAfterKeydownEcs} from 'src/utils.js';
import {createRankUserTemplate} from 'src/components/rank-user.js';
import {createBaseFiltersTemplate} from 'src/components/base-filters.js';
import {createFilmsContainerTemplate} from 'src/components/films-container.js';
import {createMainNavTemplate} from 'src/components/main-nav.js';
import {createFilmCardTemplate} from 'src/components/film-card.js';
import {createShowMoreButtonTemplate} from 'src/components/show-more-button.js';
import {createExtraBoardFilmsTemplate} from 'src/components/extra-board.js';
import {generateFilmCards} from 'src/mock/film-card.js';
import {createFilmDetailsTemplate} from 'src/components/film-details.js';
import {createStaticticsTemplate} from 'src/components/statistic';

const TOTAL_CARDS_COUNT = 17;
const EXTRA_CARDS_COUNT = 2;

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const FIRST_EXTRA_BOARD_NAME = `Top rated`;
const SECOND_EXTRA_BOARD_NAME = `Most commented`;

// function
let cardsRenderedCount = 0;

const renderCards = (containerElement, cards, cardsCount) => {
  const from = cardsRenderedCount;
  const to = from + cardsCount;

  cards
    .slice(from, to)
    .forEach((card) => {
      render(containerElement, createFilmCardTemplate(card), `beforeend`);
      const cardElements = Array.from(document.querySelectorAll(`.film-card`));
      cardElements[cardsRenderedCount].addEventListener(`click`, () => renderFilmDetailsPopup(card));
      cardsRenderedCount++;
    });
};


const renderFilmDetailsPopup = (card) => {
  const filmsListElement = document.querySelector(`.films-list`);

  render(filmsListElement, createFilmDetailsTemplate(card), `beforeend`);

  const filmDetailsElement = document.querySelector(`.film-details`);
  const filmDetailsCloseButton = filmDetailsElement.querySelector(`.film-details__close-btn`);

  filmDetailsCloseButton.addEventListener(`click`, () => unrenderFilmDetailsPopup());
  createEventListenerAfterKeydownEcs(() => unrenderFilmDetailsPopup());
};


const unrenderFilmDetailsPopup = () => {
  const filmDetailsElement = document.querySelector(`.film-details`);

  if (filmDetailsElement) {
    filmDetailsElement.remove();
  }
  removeEventListenerAfterKeydownEcs(() => unrenderFilmDetailsPopup());
};

const renderFilmsContainerElement = () => {
  render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);
  const filmsListElement = document.querySelector(`.films-list`);
  const filmsContainerElement = document.querySelector(`.films-list__container`);

  renderCards(filmsContainerElement, filmCards, SHOWING_CARDS_COUNT_ON_START);
  render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

  const filmsShowMoreButtonElement = filmsListElement.querySelector(`.films-list__show-more`);
  filmsShowMoreButtonElement.addEventListener(`click`, () => {
    renderCards(filmsContainerElement, filmCards, SHOWING_CARDS_COUNT_BY_BUTTON);
    if (cardsRenderedCount >= filmCards.length) {
      filmsShowMoreButtonElement.remove();
    }
  });
};

const createExtraBoardFilmsElement = (nameBoard, cards) => {
  const renderedCards = cards
    .slice(0, EXTRA_CARDS_COUNT)
    .map((card) => {
      return createFilmCardTemplate(card);
    }).join(``);
  const globalFilmsContainer = document.querySelector(`.films`);

  render(globalFilmsContainer, createExtraBoardFilmsTemplate(nameBoard, renderedCards), `beforeend`);
};

// data

const filmCards = generateFilmCards(TOTAL_CARDS_COUNT);
const topCommentsCards = filmCards.slice().sort((a, b) => {
  return b.countComments - a.countComments;
});
const topRatedCards = filmCards.slice().sort((a, b) => {
  return b.rating - a.rating;
});

const filmsInFiltersCount = {
  watchList: filmCards.filter((filmCard) => filmCard.watchList).length,
  history: filmCards.filter((filmCard) => filmCard.history).length,
  favorites: filmCards.filter((filmCard) => filmCard.favorites).length,
};

// main code

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, createRankUserTemplate(), `beforeend`);
render(siteMainElement, createMainNavTemplate(filmsInFiltersCount), `beforeend`);
render(siteMainElement, createBaseFiltersTemplate(), `beforeend`);

renderFilmsContainerElement();

createExtraBoardFilmsElement(FIRST_EXTRA_BOARD_NAME, topRatedCards);
createExtraBoardFilmsElement(SECOND_EXTRA_BOARD_NAME, topCommentsCards);

render(statisticsElement, createStaticticsTemplate(), `beforeend`);
