import {getRandomArrayItem, getRandomIntegerNumber} from 'src/utils/common.js';

const MIN_COUNT_COMMENTS = 1;
const MAX_COUNT_COMMENTS = 4;

const Emojis = [
  `sleeping`,
  `angry`,
  `smile`,
  `puke`,
];

const Nicknames = [
  `John Doe`,
  `Tim Macoveev`,
  `Kventin Tarantino`,
  `Uwe Boll`
];

const Texts = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const generateComment = () => {
  return {
    text: getRandomArrayItem(Texts),
    nickname: getRandomArrayItem(Nicknames),
    date: `2019/12/31 12.00`,
    emoji: getRandomArrayItem(Emojis),
  };
};

const generatePackComments = () => {
  const countComments = getRandomIntegerNumber(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);
  return new Array(countComments)
    .fill(``)
    .map(generateComment);
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePackComments);
};

export {generateComments};
