import AbstractComponent from 'src/components/abstract-component.js';
import {formatTime, formatDate} from "src/utils/common.js";


const createDetailTemplate = (term, cell) => {
  return (
    `<tr class="film-details__row">
      <td class="film-details__term">${term}</td>
      <td class="film-details__cell">${cell}</td>
    </tr>`
  );
};

const createGenresTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createDetailsTableTemplate = (details, film) => {
  return (
    `<table class="film-details__table">
      ${details
        .map((detail) => {
          return createDetailTemplate(detail.title, detail.value);
        })
        .join(`\n`)}
      <tr class="film-details__row">
        <td class="film-details__term">${film.genres.length > 1 ? `Genres` : `Genre`}</td>
        <td class="film-details__cell">
          ${film.genres.map(createGenresTemplate).join(`\n`)}
        </td>
      </tr>
    </table>`
  );
};

const createFilmDetailsTemplate = (film) => {
  const year = formatDate(film.year);
  const duration = formatTime(film.duration);

  const details = [
    {
      title: `Director`,
      value: film.director
    },
    {
      title: `Writers`,
      value: film.writers
    },
    {
      title: `Actors`,
      value: film.actors
    },
    {
      title: `Release date`,
      value: year
    },
    {
      title: `Runtime`,
      value: duration
    },
    {
      title: `Country`,
      value: film.country
    },
  ];

  return (
    `<div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${film.poster}" alt="">

          <p class="film-details__age">${film.age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.title}</h3>
              <p class="film-details__title-original">Original: ${film.title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.rating}</p>
            </div>
          </div>

          ${createDetailsTableTemplate(details, film)}
          
          <p class="film-details__film-description">
            ${film.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>`
  );
};

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }
}
