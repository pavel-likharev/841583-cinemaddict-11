import {getRandomIntegerNumber, getRandomArrayItem} from '../utils.js';
import {generateComments} from '../mock/comments.js';

const TitleItems = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

const PosterItems = [
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/popeye-meets-sinbad.png`,
];

const GenreItems = [
  `Western`,
  `Drama`,
  `Comedy`,
  `Action`,
  `Horror`,
];

const descriptionItem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;
const descriptions = descriptionItem.slice().split(`. `);

const getRandomSentencesFromDescription = () => {
  const randomIndex = getRandomIntegerNumber(1, 5);
  const sentences = [];

  for (let i = 0; i < randomIndex; i++) {
    sentences.push(descriptions[getRandomIntegerNumber(0, descriptions.length)]);
  }
  return sentences.join(`. `) + `.`;
};

const getRandomGenres = () => {
  const randomIndex = getRandomIntegerNumber(1, 4);
  const genres = [];

  for (let i = 0; i < randomIndex; i++) {
    genres.push(GenreItems[getRandomIntegerNumber(0, GenreItems.length)]);
  }

  return genres;
};

const getRandomFilter = () => (getRandomIntegerNumber(1, 3) === 1) ? true : false;

const generateFilmCard = () => {
  const randomGenres = getRandomGenres();
  const count = getRandomIntegerNumber(0, 5);
  return {
    title: getRandomArrayItem(TitleItems),
    age: getRandomIntegerNumber(0, 18) + `+`,
    poster: getRandomArrayItem(PosterItems),
    rating: `3.2`,
    director: `Tarantino`,
    writers: `Dicaprio`,
    actors: `Brad Pitt`,
    country: `USA`,
    year: `1982`,
    duration: `92m`,
    genre: randomGenres[0],
    genres: randomGenres,
    description: getRandomSentencesFromDescription(),
    countComments: count,
    comments: generateComments(count),
    watchList: getRandomFilter(),
    history: getRandomFilter(),
    favorites: getRandomFilter(),
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};


export {generateFilmCards};
