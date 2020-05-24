import {render, RenderPosition, replace, remove} from 'src/utils/render.js';
import CommentsComponent from 'src/components/comments.js';

export default class CommentsController {
  constructor(container) {
    this._container = container;
    // this._onDataChange = onDataChange;
    // this._onViewChange = onViewChange;

    this._commentsComponent = null;

    // this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._siteBodyElement = document.querySelector(`body`);
  }

  render(packComments) {
    const oldCommentsComponent = this._commentsComponent;

    this._commentsComponent = new CommentsComponent(packComments, packComments.length);

    if (oldCommentsComponent) {
      replace(this._commentsComponent, oldCommentsComponent);
    } else {
      render(this._container, this._commentsComponent, RenderPosition.BEFOREEND);
    }
  }


}
