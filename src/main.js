import {removeElemenAfterKeydownEcs} from './utils.js';
import {createRankUserTemplate} from './components/rank-user.js';
import {createBaseFiltersTemplate} from './components/base-filters.js';
import {createFilmsContainerTemplate} from './components/films-container.js';
import {createMainNavTemplate} from './components/main-nav.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createExtraBoardFilmsTemplate} from './components/extra-board.js';
import {generateFilmCards} from "./mock/film-card.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";


const COUNT_CARDS = 17;
const COUNT_EXTRA_CARDS = 2;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const filmCards = generateFilmCards(COUNT_CARDS);
let cardPosters = ``;
let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const renderPopup = (card, elem) => {
  card.addEventListener(`click`, () => {
    // if (!document.querySelector(`.film-details`)) {
    if (document.querySelector(`.film-details`)) {
      document.querySelector(`.film-details`).remove();
    }
    render(filmsContainerElement, createFilmDetailsTemplate(filmCards[elem]), `beforeend`);
    const detailFilmPopup = document.querySelector(`.film-details`);
    const closePopupButton = detailFilmPopup.querySelector(`.film-details__close-btn`);
    closePopupButton.addEventListener(`click`, () => {
      detailFilmPopup.remove();
    });
    removeElemenAfterKeydownEcs(detailFilmPopup);
    // }
  });
};

const updateListenerForCards = () => {
  cardPosters = Array.from(document.querySelector(`.films-list`).querySelectorAll(`.film-card__poster`));
  return cardPosters.slice()
    .forEach((card, index) => {
      return renderPopup(card, index);
    });
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createRankUserTemplate(), `beforeend`);
render(siteMainElement, createMainNavTemplate(), `beforeend`);
render(siteMainElement, createBaseFiltersTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsContainerElement = siteMainElement.querySelector(`.films`);
const boardFilmsContainer = filmsContainerElement.querySelector(`.films-list`);
const boardFilmsElement = filmsContainerElement.querySelector(`.films-list`).querySelector(`.films-list__container`);

filmCards.slice(0, showingCardsCount)
  .forEach((card) => render(boardFilmsElement, createFilmCardTemplate(card), `beforeend`));
updateListenerForCards();

render(boardFilmsContainer, createShowMoreButtonTemplate(), `beforeend`);

const showMoreButton = boardFilmsContainer.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevCardsCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  filmCards.slice(prevCardsCount, showingCardsCount)
    .forEach((card) => render(boardFilmsElement, createFilmCardTemplate(card), `beforeend`));
  updateListenerForCards();

  if (showingCardsCount >= filmCards.length) {
    showMoreButton.remove();
  }
});

render(filmsContainerElement, createExtraBoardFilmsTemplate(`Top rated`), `beforeend`);
render(filmsContainerElement, createExtraBoardFilmsTemplate(`Most commented`), `beforeend`);

const extraBoardFilmsElements = filmsContainerElement.querySelectorAll(`.films-list--extra`);
const firstExtraBoardFilmsElement = extraBoardFilmsElements[0].querySelector(`.films-list__container`);
const secondExtraBoardFilmsElement = extraBoardFilmsElements[1].querySelector(`.films-list__container`);

for (let i = 0; i < COUNT_EXTRA_CARDS; i++) {
  render(firstExtraBoardFilmsElement, createFilmCardTemplate(filmCards[0]), `beforeend`);
}

for (let i = 0; i < COUNT_EXTRA_CARDS; i++) {
  render(secondExtraBoardFilmsElement, createFilmCardTemplate(filmCards[0]), `beforeend`);
}

const statisticsElement = document.querySelector(`.footer__statistics`);
const createStaticticsTemplate = () => {
  return `<p>${COUNT_CARDS} movies inside</p>`;
};
render(statisticsElement, createStaticticsTemplate(), `beforeend`);
