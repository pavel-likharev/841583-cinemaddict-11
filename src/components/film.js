import AbstractComponent from 'src/components/abstract-component.js';
import {formatTime, formatDate} from "src/utils/common.js";

const MAX_LENGTH_DESCRIPTION_ON_FILM_CARD = 140;

const createFilmTemplate = (film, countComments) => {
  const description = film.description.length >= MAX_LENGTH_DESCRIPTION_ON_FILM_CARD
    ? film.description.slice(0, MAX_LENGTH_DESCRIPTION_ON_FILM_CARD) + `...`
    : film.description;
  const year = formatDate(film.year);
  const duration = formatTime(film.duration);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${film.title}</h3>
      <p class="film-card__rating">${film.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${film.genre}</span>
      </p>
      <img src="${film.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${countComments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${film.isWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${film.isHistory ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${film.isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Film extends AbstractComponent {
  constructor(film, countComments) {
    super();

    this._film = film;
    this._countComments = countComments;
  }

  getTemplate() {
    return createFilmTemplate(this._film, this._countComments);
  }

  setKitElementsClickHandler(handler) {
    const kitElements = [
      this.getElement().querySelector(`.film-card__poster`),
      this.getElement().querySelector(`.film-card__title`),
      this.getElement().querySelector(`.film-card__comments`)
    ];
    kitElements.forEach((element) => {
      element.addEventListener(`click`, handler);
    });
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
