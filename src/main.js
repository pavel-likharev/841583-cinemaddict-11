import {createRankUserTemplate} from './components/rank-user.js';
import {createBaseFiltersTemplate} from './components/base-filters.js';
import {createFilmsContainerTemplate} from './components/films-container.js';
import {createMainNavTemplate} from './components/main-nav.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createExtraBoardFilmsTemplate} from './components/extra-board.js';


const COUNT_CARDS = 5;
const COUNT_EXTRA_CARDS = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createRankUserTemplate(), `beforeend`);
render(siteMainElement, createMainNavTemplate(), `beforeend`);
render(siteMainElement, createBaseFiltersTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsContainerElement = siteMainElement.querySelector(`.films`);
const boardFilmsElement = filmsContainerElement.querySelector(`.films-list`).querySelector(`.films-list__container`);

for (let i = 0; i < COUNT_CARDS; i++) {
  render(boardFilmsElement, createFilmCardTemplate(), `beforeend`);
}

render(filmsContainerElement, createShowMoreButtonTemplate(), `beforeend`);

render(filmsContainerElement, createExtraBoardFilmsTemplate(`Top rated`), `beforeend`);
render(filmsContainerElement, createExtraBoardFilmsTemplate(`Most commented`), `beforeend`);

const extraBoardFilmsElements = filmsContainerElement.querySelectorAll(`.films-list--extra`);
const firstExtraBoardFilmsElement = extraBoardFilmsElements[0].querySelector(`.films-list__container`);
const secondExtraBoardFilmsElement = extraBoardFilmsElements[1].querySelector(`.films-list__container`);

for (let i = 0; i < COUNT_EXTRA_CARDS; i++) {
  render(firstExtraBoardFilmsElement, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < COUNT_EXTRA_CARDS; i++) {
  render(secondExtraBoardFilmsElement, createFilmCardTemplate(), `beforeend`);
}
