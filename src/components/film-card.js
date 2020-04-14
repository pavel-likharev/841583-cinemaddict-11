export const createFilmCardTemplate = (card) => {
  const {title, poster, rating, year, duration, genre, description, countComments, watchList, history, favorites} = card;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description.length >= 140 ? description.slice(0, 140) + `...` : description }</p>
    <a class="film-card__comments">${countComments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchList === true ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${history === true ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favorites === true ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>
  </article>`;
};
