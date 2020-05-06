import AbstractComponent from 'src/components/abstract-component.js';


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

const createDetailsTableTemplate = (details, card) => {
  return (
    `<table class="film-details__table">
      ${details
        .map((detail) => {
          createDetailTemplate(detail.title, detail.value);
        })
        .join(`\n`)}
      <tr class="film-details__row">
        <td class="film-details__term">${card.genres.length > 1 ? `Genres` : `Genre`}</td>
        <td class="film-details__cell">
          ${card.genres.map(createGenresTemplate).join(`\n`)}
        </td>
      </tr>
    </table>`
  );
};

const createFilmDetailsTemplate = (card) => {
  const details = [
    {
      title: `Director`,
      value: card.director
    },
    {
      title: `Writers`,
      value: card.writers
    },
    {
      title: `Actors`,
      value: card.actors
    },
    {
      title: `Release date`,
      value: card.year
    },
    {
      title: `Runtime`,
      value: card.duration
    },
    {
      title: `Country`,
      value: card.country
    },
  ];

  return (
    `<div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${card.poster}" alt="">

          <p class="film-details__age">${card.age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${card.title}</h3>
              <p class="film-details__title-original">Original: ${card.title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${card.rating}</p>
            </div>
          </div>

          ${createDetailsTableTemplate(details, card)}

          <p class="film-details__film-description">
            ${card.description}
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
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._card);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, handler);
  }
}
