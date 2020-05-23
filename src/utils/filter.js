// import {isWatchlist, isHistory, isFavorite} from "src/utils/common.js";
import {FilterType} from 'src/const.js';

export const getWatchlistFilms = (films) => {
  return films.filter((film) => film.isWatchlist);
};

export const getFavoritesFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

export const getHistoryfilms = (films) => {
  return films.filter((film) => film.isHistory);
};


export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.FAVORITES:
      return getFavoritesFilms(films);
    case FilterType.HISTORY:
      return getHistoryfilms(films);
  }

  return films;
};
