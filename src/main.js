import {render, RenderPosition} from 'src/utils/render.js';
import RankUserComponent from 'src/components/rank-user.js';
import BoardFilmsComponent from 'src/components/board-films.js';
import FilterController from 'src/controllers/filter.js';
import StatisticsComponent from 'src/components/statistic';
import PageController from 'src/controllers/page.js';
import FilmsModel from "src/models/films.js";
import {generateFilms} from 'src/mock/film.js';
import CommentsModel from 'src/models/comments.js';
import {generateComments} from 'src/mock/comments.js';

const TOTAL_FILMS_COUNT = 17;
const BOARD_NAME_RATING = `Top rated`;
const BOARD_NAME_COMMENTED = `Most commented`;

const films = generateFilms(TOTAL_FILMS_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const comments = generateComments(TOTAL_FILMS_COUNT);
const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const topCommentsFilms = films.slice().sort((a, b) => b.countComments - a.countComments);
const topRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const statisticsElement = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, new RankUserComponent(), RenderPosition.BEFOREEND);

const boardFilmsComponent = new BoardFilmsComponent();
render(siteMainElement, boardFilmsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(boardFilmsComponent, filmsModel, commentsModel);

pageController.renderBoard();

const filterController = new FilterController(siteMainElement, filmsModel);
filterController.render();

// pageController.renderExtraBoard(BOARD_NAME_RATING, topRatedFilms);
// pageController.renderExtraBoard(BOARD_NAME_COMMENTED, topCommentsFilms);

render(statisticsElement, new StatisticsComponent(TOTAL_FILMS_COUNT), RenderPosition.BEFOREEND);
