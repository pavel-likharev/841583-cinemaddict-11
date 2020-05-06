import AbstractComponent from 'src/components/abstract-component.js';

const createFilmDetailsContainerTemplate = () => {
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
      </form>
    </section>`
  );
};

export default class FilmDetailsContainer extends AbstractComponent {
  getTemplate() {
    return createFilmDetailsContainerTemplate();
  }
}
