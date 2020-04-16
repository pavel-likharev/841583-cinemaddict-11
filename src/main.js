import {render} from 'src/utils.js';
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
const EXTRA_CARD_START_NUMBER = 0;

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const FIRST_EXTRA_BOARD_NAME = `Top rated`;
const SECOND_EXTRA_BOARD_NAME = `Most commented`;

// function
let cardsRenderedCount = 0;


const renderCards = (containerElement, cards, cardsCount, startNumber) => {
  const from = startNumber;
  const to = from + cardsCount;

  if (startNumber === cardsRenderedCount) {
    cards
      .slice(from, to)
      .forEach((card) => {
        render(containerElement, createFilmCardTemplate(card), `beforeend`);
        const cardElements = Array.from(document.querySelectorAll(`.film-card`));
        cardElements[cardsRenderedCount].addEventListener(`click`, () => renderFilmDetailsPopup(card));
        cardsRenderedCount++;
      });
  } else if (startNumber === extraCardsRenderedCount) {
    cards
      .slice(from, to)
      .forEach((card) => {
        render(containerElement, createFilmCardTemplate(card), `beforeend`);
        const cardElements = Array.from(document.querySelectorAll(`.film-card`));
        cardElements[extraCardsRenderedCount].addEventListener(`click`, () => renderFilmDetailsPopup(card));
        extraCardsRenderedCount++;
      });
    extraCardsRenderedCount = EXTRA_CARD_START_NUMBER;
  }
};

const listenerPressButtonEsc = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    unrenderFilmDetailsPopup();
  }
};

const renderFilmDetailsPopup = (card) => {
  render(siteBodyElement, createFilmDetailsTemplate(card), `beforeend`);
  siteBodyElement.classList.add(`hide-overflow`);
  const filmDetailsElement = document.querySelector(`.film-details`);
  const filmDetailsCloseButton = filmDetailsElement.querySelector(`.film-details__close-btn`);

  filmDetailsCloseButton.addEventListener(`click`, () => unrenderFilmDetailsPopup());
  document.addEventListener(`keydown`, listenerPressButtonEsc);
};

const unrenderFilmDetailsPopup = () => {
  const filmDetailsElement = document.querySelector(`.film-details`);
  if (filmDetailsElement) {
    filmDetailsElement.remove();
    document.removeEventListener(`keydown`, listenerPressButtonEsc);
    siteBodyElement.classList.remove(`hide-overflow`);
  }
};

const renderFilmsContainerElement = () => {
  render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);
  const filmsListElement = document.querySelector(`.films-list`);
  const filmsContainerElement = document.querySelector(`.films-list__container`);

  renderCards(filmsContainerElement, filmCards, SHOWING_CARDS_COUNT_ON_START, cardsRenderedCount);
  render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

  const filmsShowMoreButtonElement = filmsListElement.querySelector(`.films-list__show-more`);
  filmsShowMoreButtonElement.addEventListener(`click`, () => {
    renderCards(filmsContainerElement, filmCards, SHOWING_CARDS_COUNT_BY_BUTTON, cardsRenderedCount);
    if (cardsRenderedCount >= filmCards.length) {
      filmsShowMoreButtonElement.remove();
    }
  });
};

let extraCardsContainersRenderedCount = 0;
let extraCardsRenderedCount = 0;
const createExtraBoardFilmsElement = (nameBoard, cards) => {
  render(globalFilmsContainer, createExtraBoardFilmsTemplate(nameBoard), `beforeend`);

  const extraBoardContainerElements = document.querySelectorAll(`.films-list--extra`);
  const requiredBoardContainerElement = extraBoardContainerElements[extraCardsContainersRenderedCount].querySelector(`.films-list__container`);

  renderCards(requiredBoardContainerElement, cards, EXTRA_CARDS_COUNT, extraCardsRenderedCount);
  extraCardsContainersRenderedCount++;
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

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, createRankUserTemplate(), `beforeend`);
render(siteMainElement, createMainNavTemplate(filmsInFiltersCount), `beforeend`);
render(siteMainElement, createBaseFiltersTemplate(), `beforeend`);

renderFilmsContainerElement();

const globalFilmsContainer = document.querySelector(`.films`);

createExtraBoardFilmsElement(FIRST_EXTRA_BOARD_NAME, topRatedCards);
createExtraBoardFilmsElement(SECOND_EXTRA_BOARD_NAME, topCommentsCards);

render(statisticsElement, createStaticticsTemplate(), `beforeend`);
