import AbstractComponent from 'src/components/abstract-component.js';
import {formatTime, formatDate} from "src/utils/common.js";

const MAX_LENGTH_DESCRIPTION_ON_CARD = 140;

const createFilmCardTemplate = (card) => {
  const description = card.description.length >= MAX_LENGTH_DESCRIPTION_ON_CARD
    ? card.description.slice(0, MAX_LENGTH_DESCRIPTION_ON_CARD) + `...`
    : card.description;
  const year = formatDate(card.year);
  const duration = formatTime(card.duration);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${card.title}</h3>
      <p class="film-card__rating">${card.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${card.genre}</span>
      </p>
      <img src="${card.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${card.countComments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${card.watchList ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${card.history ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${card.favorites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Film extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
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
