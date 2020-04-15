const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const createEventListenerAfterKeydownEcs = (fn) => {
  document.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      fn();
    }
  });
};

const removeEventListenerAfterKeydownEcs = (fn) => {
  document.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      fn();
    }
  });
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export {render, getRandomIntegerNumber, getRandomArrayItem, formatTime, createEventListenerAfterKeydownEcs, removeEventListenerAfterKeydownEcs};
