import {Emojis} from 'src/mock/comments.js';

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

const createListEmojisTemplate = (emojis) => {
  return (
    `<div class="film-details__emoji-list">
      ${emojis.map(createEmojiTemplate).join(`\n`)}
    </div>`
  );
};

export const createContainerCommentsTemplate = (comments, countComments) => {
  return (
    `<div class="form-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${countComments}</span></h3>

      ${createListCommentsTemplate(comments)}

      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        ${createListEmojisTemplate(Emojis)}

      </div>
    </section>
  </div>`
  );
};
