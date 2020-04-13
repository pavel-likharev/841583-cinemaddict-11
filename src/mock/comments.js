import {getRandomArrayItem} from "../utils.js";

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

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
