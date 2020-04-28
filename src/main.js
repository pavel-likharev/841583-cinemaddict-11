import {render, RenderPosition} from 'src/utils.js';
import RankUserComponent from 'src/components/rank-user.js';
import BaseFiltersComponent from 'src/components/base-filters.js';
import FilmsListComponent from 'src/components/films-list.js';
import FilmsListExtraComponent from 'src/components/films-list-extra.js';
import FilmsContainerComponent from 'src/components/films-container.js';
import MainNavigationComponent from 'src/components/main-nav.js';
import FilmCardComponent from 'src/components/film-card.js';
import ShowMoreButtonComponent from 'src/components/show-more-button.js';
import FilmDetailsComponent from 'src/components/film-details.js';
import FilmDetailsContainerComponent from 'src/components/film-details-container.js';
import CommentsComponent from 'src/components/comments.js';
import StatisticsComponent from 'src/components/statistic';
import {generateFilmCards} from 'src/mock/film-card.js';

const TOTAL_CARDS_COUNT = 17;
const EXTRA_CARDS_COUNT = 2;
const CARDS_RENDER_STEP = 5;

const BOARD_NAME_RATING = `Top rated`;
const BOARD_NAME_COMMENTED = `Most commented`;

const KEY_CODE_ESC = 27;

const createCardsRenderer = (containerElement, cards, step) => {
  let counter = 0;

  return {
    isRenderCompleted: () => counter >= cards.length,
    render: () => {
      const from = counter;
      const to = from + step;

      cards
        .slice(from, to)
        .forEach((card) => {
          const element = new FilmCardComponent(card).getElement();
          render(containerElement, element, RenderPosition.BEFOREEND);
          element.addEventListener(`click`, () => renderFilmDetailsPopup(card));
          counter++;
        });
    },
  };
};

const handleDocumentKeydown = (evt) => {
  if (evt.keyCode === KEY_CODE_ESC) {
    evt.preventDefault();
    unrenderFilmDetailsPopup();
  }
};

const renderFilmDetailsPopup = (card) => {
  const filmDetailsContainerElement = new FilmDetailsContainerComponent().getElement();
  const filmDetailsElement = new FilmDetailsComponent(card).getElement();
  const commentsElement = new CommentsComponent(card).getElement();

  const filmDetailsCloseButtonElement = filmDetailsElement.querySelector(`.film-details__close-btn`);
  const filmDetailsWrapperElement = filmDetailsContainerElement.querySelector(`.film-details__inner`);

  render(siteBodyElement, filmDetailsContainerElement, RenderPosition.BEFOREEND);
  render(filmDetailsWrapperElement, filmDetailsElement, RenderPosition.BEFOREEND);
  render(filmDetailsWrapperElement, commentsElement, RenderPosition.BEFOREEND);

  siteBodyElement.classList.add(`hide-overflow`);

  filmDetailsCloseButtonElement.addEventListener(`click`, () => unrenderFilmDetailsPopup());
  document.addEventListener(`keydown`, handleDocumentKeydown);
};

const unrenderFilmDetailsPopup = () => {
  const filmDetailsElement = document.querySelector(`.film-details`);
  if (filmDetailsElement) {
    filmDetailsElement.remove();

    siteBodyElement.classList.remove(`hide-overflow`);

    document.removeEventListener(`keydown`, handleDocumentKeydown);
  }
};

const renderBoardFilms = (containerElement) => {
  const buttonElement = new ShowMoreButtonComponent().getElement();
  const filmsListElement = new FilmsListComponent().getElement();
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

  const cardsRenderer = createCardsRenderer(filmsListContainerElement, filmCards, CARDS_RENDER_STEP);

  cardsRenderer.render();

  render(filmsListElement, buttonElement, RenderPosition.BEFOREEND);
  render(containerElement, filmsListElement, RenderPosition.BEFOREEND);

  buttonElement.addEventListener(`click`, () => {
    cardsRenderer.render();
    if (cardsRenderer.isRenderCompleted()) {
      buttonElement.remove();
    }
  });
};

const renderExtraBoardFilms = (containerElement, nameBoard, filmCards) => {
  const extraBoardElement = new FilmsListExtraComponent(nameBoard).getElement();
  const filmsListContainerElement = extraBoardElement.querySelector(`.films-list__container`);

  render(containerElement, extraBoardElement, RenderPosition.BEFOREEND);
  const cardsRenderer = createCardsRenderer(filmsListContainerElement, filmCards, EXTRA_CARDS_COUNT);
  cardsRenderer.render();
};

const filmCards = generateFilmCards(TOTAL_CARDS_COUNT);
const topCommentsCards = filmCards.slice().sort((a, b) => b.countComments - a.countComments);
const topRatedCards = filmCards.slice().sort((a, b) => b.rating - a.rating);

const filmsInFiltersCount = {
  watchList: filmCards.filter((filmCard) => filmCard.watchList).length,
  history: filmCards.filter((filmCard) => filmCard.history).length,
  favorites: filmCards.filter((filmCard) => filmCard.favorites).length,
};

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, new RankUserComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationComponent(filmsInFiltersCount).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new BaseFiltersComponent().getElement(), RenderPosition.BEFOREEND);

const filmsContainerElement = new FilmsContainerComponent().getElement();
render(siteMainElement, filmsContainerElement, RenderPosition.BEFOREEND);

renderBoardFilms(filmsContainerElement);
renderExtraBoardFilms(filmsContainerElement, BOARD_NAME_RATING, topRatedCards);
renderExtraBoardFilms(filmsContainerElement, BOARD_NAME_COMMENTED, topCommentsCards);

render(statisticsElement, new StatisticsComponent(TOTAL_CARDS_COUNT).getElement(), RenderPosition.BEFOREEND);
