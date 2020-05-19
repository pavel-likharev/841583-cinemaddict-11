import {render, RenderPosition, replace} from 'src/utils/render.js';
import FilmCardComponent from 'src/components/film-card.js';
import FilmDetailsComponent from 'src/components/film-details.js';
import FilmDetailsContainerComponent from 'src/components/film-details-container.js';
import CommentsComponent from 'src/components/comments.js';

const KEY_CODE_ESC = 27;

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._filmCardComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._siteBodyElement = document.querySelector(`body`);
  }

  render(card) {
    const oldFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardComponent(card);
    this._filmDetailsContainerComponent = new FilmDetailsContainerComponent();
    this._filmDetailsComponent = new FilmDetailsComponent(card);
    this._commentsComponent = new CommentsComponent(card);

    this._filmCardComponent.setKitElementsClickHandler(() => {
      this._renderFilmDetailsPopup(card);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._unrenderFilmDetailsPopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        watchList: !card.watchList,
      }));
    });

    this._filmCardComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        history: !card.history,
      }));
    });

    this._filmCardComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        favorites: !card.favorites,
      }));
    });

    if (oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
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
    this._filmDetailsContainerComponent.getElement().remove();
    this._siteBodyElement.classList.remove(`hide-overflow`);
  }

  setDefaultView() {
    if (this._filmDetailsContainerComponent.getElement()) {
      this._unrenderFilmDetailsPopup();
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
