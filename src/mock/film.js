import {getRandomIntegerNumber, getRandomArrayItem} from 'src/utils/common.js';

const MIN_COUNT_SENTENCES = 1;
const MAX_COUNT_SENTENCES = 5;
const MIN_COUNT_GENRES = 1;
const MAX_COUNT_GENRES = 3;
const MIN_AGE_RATING = 0;
const MAX_AGE_RATING = 18;
const MIN_FILM_RATING = 0;
const MAX_FILM_RATING = 10;

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
const descriptions = descriptionItem.split(`. `);

const getRandomSentencesFromDescription = () => {
  const randomIndex = getRandomIntegerNumber(MIN_COUNT_SENTENCES, MAX_COUNT_SENTENCES);
  const sentences = [];

  for (let i = 0; i < randomIndex; i++) {
    sentences.push(descriptions[getRandomIntegerNumber(0, descriptions.length)]);
  }
  return sentences.join(`. `) + `.`;
};

const getRandomGenres = () => {
  const randomIndex = getRandomIntegerNumber(MIN_COUNT_GENRES, MAX_COUNT_GENRES);
  const genres = [];

  for (let i = 0; i < randomIndex; i++) {
    genres.push(GenreItems[getRandomIntegerNumber(0, GenreItems.length)]);
  }

  return genres;
};

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValueYear = getRandomIntegerNumber(40, 60);

  targetDate.setYear(targetDate.getYear() - diffValueYear);
  return targetDate;
};

const generateRandomBoolean = () => Math.random() > 0.5;

const generateFilm = () => {
  const randomGenres = getRandomGenres();
  const year = getRandomDate();
  const duration = getRandomDate();

  return {
    title: getRandomArrayItem(TitleItems),
    age: getRandomIntegerNumber(MIN_AGE_RATING, MAX_AGE_RATING) + `+`,
    poster: getRandomArrayItem(PosterItems),
    rating: `${getRandomIntegerNumber(MIN_FILM_RATING, MAX_FILM_RATING) + getRandomIntegerNumber(MIN_FILM_RATING, MAX_FILM_RATING) / 10}`,
    director: `Tarantino`,
    writers: `Dicaprio`,
    actors: `Brad Pitt`,
    country: `USA`,
    year,
    duration,
    genre: randomGenres[0],
    genres: randomGenres,
    description: getRandomSentencesFromDescription(),
    isWatchlist: generateRandomBoolean(),
    isHistory: generateRandomBoolean(),
    isFavorite: generateRandomBoolean(),
    comments: null,
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {generateFilms};
