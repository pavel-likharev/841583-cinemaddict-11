"use strict";

const COUNT_CARDS = 5;
const COUNT_EXTRA_CARDS = 2;

const createRankUserTemplate = () => {
  return `<section class="header__profile profile">
  <p class="profile__rating">Movie Buff</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

const createMainNavTemplate = () => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

const createBaseFiltersTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;
};

const createFilmsContainerTemplate = () => {
  return `<section class="films"></section>`;
};

const createBoardFilmsTemplate = () => {
  return `<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  <div class="films-list__container">
  </div>
  </section>`;
};

const createExtraBoardFilmsTemplate = (title) => {
  return `<section class="films-list--extra">
  <h2 class="films-list__title">${title}</h2>
  <div class="films-list__container">
  </div>
  </section>`;
};

const createFilmCardTemplate = () => {
  return `<article class="film-card">
  <h3 class="film-card__title">Sagebrush Trail</h3>
  <p class="film-card__rating">3.2</p>
  <p class="film-card__info">
    <span class="film-card__year">1933</span>
    <span class="film-card__duration">54m</span>
    <span class="film-card__genre">Western</span>
  </p>
  <img src="./images/posters/sagebrush-trail.jpg" alt="" class="film-card__poster">
  <p class="film-card__description">Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…</p>
  <a class="film-card__comments">89 comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
</article>`;
};

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

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

render(filmsContainerElement, createBoardFilmsTemplate(), `beforeend`);

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
