import {render, RenderPosition} from 'src/utils/render.js';
import RankUserComponent from 'src/components/rank-user.js';
import BoardFilmsComponent from 'src/components/board-films.js';
import MainNavigationComponent from 'src/components/main-nav.js';
import StatisticsComponent from 'src/components/statistic';
import PageController from 'src/controllers/page.js';
import FilmsModel from "src/models/films.js";
import {generateFilmCards} from 'src/mock/film.js';

const TOTAL_CARDS_COUNT = 17;
const BOARD_NAME_RATING = `Top rated`;
const BOARD_NAME_COMMENTED = `Most commented`;

const filmCards = generateFilmCards(TOTAL_CARDS_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(filmCards);

const topCommentsCards = filmCards.slice().sort((a, b) => b.countComments - a.countComments);
const topRatedCards = filmCards.slice().sort((a, b) => b.rating - a.rating);

const filmsInFiltersCount = {
  watchList: filmCards.filter((filmCard) => filmCard.watchList).length,
  history: filmCards.filter((filmCard) => filmCard.history).length,
  favorites: filmCards.filter((filmCard) => filmCard.favorites).length,
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, new RankUserComponent(), RenderPosition.BEFOREEND);

const boardFilmsComponent = new BoardFilmsComponent();
render(siteMainElement, boardFilmsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(boardFilmsComponent, filmsModel);

pageController.renderBoard();

render(siteMainElement, new MainNavigationComponent(filmsInFiltersCount), RenderPosition.AFTERBEGIN);

pageController.renderExtraBoard(BOARD_NAME_RATING, topRatedCards);
pageController.renderExtraBoard(BOARD_NAME_COMMENTED, topCommentsCards);

render(statisticsElement, new StatisticsComponent(TOTAL_CARDS_COUNT), RenderPosition.BEFOREEND);
