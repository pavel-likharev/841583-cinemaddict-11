import moment from "moment";

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const formatTime = (date) => {
  return moment(date).format(`h`) + `h ` + moment(date).format(`m`) + `m`;
};

const formatDate = (date) => {
  return moment(date).format(`YYYY`);
};

export {getRandomIntegerNumber, getRandomArrayItem, formatTime, formatDate};
