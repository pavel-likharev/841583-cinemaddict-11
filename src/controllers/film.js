import {render, RenderPosition, replace, remove} from 'src/utils/render.js';
import FilmComponent from 'src/components/film.js';
import FilmDetailsComponent from 'src/components/film-details.js';
import FilmDetailsContainerComponent from 'src/components/film-details-container.js';
import CommentsController from 'src/controllers/comments.js';

const KEY_CODE_ESC = 27;

const renderPackComments = (filmDetailsWrapperElement, packComments) => {
  const commentsController = new CommentsController(filmDetailsWrapperElement);

  commentsController.render(packComments);

  return commentsController;
};

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._showedComments = [];
    this._filmComponent = null;
    this._comments = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._siteBodyElement = document.querySelector(`body`);
  }

  render(film, packComments) {
    const oldFilmComponent = this._filmComponent;
    // const oldComments = this._comments;

    this._filmComponent = new FilmComponent(film, packComments.length);
    this._filmDetailsContainerComponent = new FilmDetailsContainerComponent();
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._comments = packComments;

    this._filmComponent.setKitElementsClickHandler(() => {
      this._renderFilmDetailsPopup(this._comments);
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

  _renderFilmDetailsPopup(packComments) {
    this._onViewChange();
    const filmDetailsWrapperElement = this._filmDetailsContainerComponent.getElement().querySelector(`.film-details__inner`);

    render(this._siteBodyElement, this._filmDetailsContainerComponent, RenderPosition.BEFOREEND);
    render(filmDetailsWrapperElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    this._renderPackComments(filmDetailsWrapperElement, packComments);

    this._siteBodyElement.classList.add(`hide-overflow`);
  }

  _unrenderFilmDetailsPopup() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    if (document.contains(this._filmDetailsContainerComponent.getElement())) {
      this._filmDetailsContainerComponent.getElement().remove();
      this._siteBodyElement.classList.remove(`hide-overflow`);
    }
  }

  _renderPackComments(filmDetailsWrapperElement, packComments) {
    const newPackComments = renderPackComments(filmDetailsWrapperElement, packComments);

    this._showedComments = this._showedComments.concat(newPackComments);
    this._countComments = this._showedComments.length;
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      evt.preventDefault();
      this._unrenderFilmDetailsPopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
