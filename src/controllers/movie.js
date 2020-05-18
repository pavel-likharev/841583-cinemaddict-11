import {render, RenderPosition, remove} from 'src/utils/render.js';
import FilmCardComponent from 'src/components/film-card.js';
import FilmDetailsComponent from 'src/components/film-details.js';
import FilmDetailsContainerComponent from 'src/components/film-details-container.js';
import CommentsComponent from 'src/components/comments.js';

const KEY_CODE_ESC = 27;

export default class MovieController {
  constructor(container) {
    this._container = container;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._siteBodyElement = document.querySelector(`body`);
  }

  render(card) {
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

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmDetailsPopup() {
    this._unrenderFilmDetailsPopup();

    const filmDetailsWrapperElement = this._filmDetailsContainerComponent.getElement().querySelector(`.film-details__inner`);

    render(this._siteBodyElement, this._filmDetailsContainerComponent, RenderPosition.BEFOREEND);
    render(filmDetailsWrapperElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    render(filmDetailsWrapperElement, this._commentsComponent, RenderPosition.BEFOREEND);

    this._siteBodyElement.classList.add(`hide-overflow`);
  }

  _unrenderFilmDetailsPopup() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    const filmDetailsElement = document.querySelector(`.film-details`);
    if (filmDetailsElement) {
      filmDetailsElement.remove();
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
