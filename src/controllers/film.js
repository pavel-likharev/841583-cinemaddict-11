import {render, RenderPosition, replace, remove} from 'src/utils/render.js';
import FilmComponent from 'src/components/film.js';
import FilmDetailsComponent from 'src/components/film-details.js';
import FilmDetailsContainerComponent from 'src/components/film-details-container.js';
import CommentsComponent from 'src/components/comments.js';

const KEY_CODE_ESC = 27;

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._filmComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._siteBodyElement = document.querySelector(`body`);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;

    this._filmComponent = new FilmComponent(film);
    this._filmDetailsContainerComponent = new FilmDetailsContainerComponent();
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._commentsComponent = new CommentsComponent(film);

    this._filmComponent.setKitElementsClickHandler(() => {
      this._renderFilmDetailsPopup(film);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isHistory: !film.isHistory,
      }));
    });

    this._filmComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._unrenderFilmDetailsPopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    if (oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
    } else {
      render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
    }
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (this._filmDetailsContainerComponent.getElement()) {
      this._unrenderFilmDetailsPopup();
    }
  }

  _renderFilmDetailsPopup() {
    this._onViewChange();
    const filmDetailsWrapperElement = this._filmDetailsContainerComponent.getElement().querySelector(`.film-details__inner`);

    render(this._siteBodyElement, this._filmDetailsContainerComponent, RenderPosition.BEFOREEND);
    render(filmDetailsWrapperElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    render(filmDetailsWrapperElement, this._commentsComponent, RenderPosition.BEFOREEND);

    this._siteBodyElement.classList.add(`hide-overflow`);
  }

  _unrenderFilmDetailsPopup() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    if (document.contains(this._filmDetailsContainerComponent.getElement())) {
      this._filmDetailsContainerComponent.getElement().remove();
      this._siteBodyElement.classList.remove(`hide-overflow`);
    }
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      evt.preventDefault();
      this._unrenderFilmDetailsPopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
