import AbstractSmartComponent from 'src/components/abstract-smart-component.js';

const emojis = [
  {name: `sleeping`},
  {name: `angry`},
  {name: `smile`},
  {name: `puke`},
];

const createCommentTemplate = (comment) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.nickname}</span>
          <span class="film-details__comment-day">${comment.date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createListCommentsTemplate = (comments) => {
  return (
    `<ul class="film-details__comments-list">
      ${comments.map(createCommentTemplate).join(`\n`)}
    </ul>`
  );
};

const createEmojiTemplate = (nameEmoji) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${nameEmoji}" value="${nameEmoji}">
      <label class="film-details__emoji-label" for="emoji-${nameEmoji}">
        <img src="./images/emoji/${nameEmoji}.png" width="30" height="30" alt="emoji">
      </label>`
  );
};

const createImageEmojiTemplate = (emoji) => {
  if (!emoji) {
    return ``;
  }
  return (
    `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`
  );
};

const createListEmojisTemplate = (listEmojis) => {
  return (
    `<div class="film-details__emoji-list">
      ${listEmojis.map((emoji) => createEmojiTemplate(emoji.name)).join(`\n`)}
    </div>`
  );
};

const createCommentsTemplate = (film, currentEmoji) => {
  return (
    `<div class="form-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.countComments}</span></h3>

      ${createListCommentsTemplate(film.comments)}

      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">${createImageEmojiTemplate(currentEmoji)}</div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        ${createListEmojisTemplate(emojis)}

      </div>
    </section>
  </div>`
  );
};

export default class Comments extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;

    this._currentEmoji = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCommentsTemplate(this._film, this._currentEmoji);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const listEmojis = Array.from(element.querySelectorAll(`.film-details__emoji-item`));

    listEmojis.forEach((emoji) => {
      emoji.addEventListener(`click`, () => {
        this._currentEmoji = emoji.value;
        this.rerender();
      });
    });
  }
}
