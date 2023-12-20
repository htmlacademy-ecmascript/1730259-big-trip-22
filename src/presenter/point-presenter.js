import { render, replace } from '../framework/render';
import { isEscape } from '../utils/common';
import EditPointView from '../view/edit-point-view';
import WaypointView from '../view/waypoint-view';

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;

  // TODO еще раз уточнить про данные можно ли нал или надо ставить массив

  #point = null;
  #offers = null;
  #destinations = null;

  constructor({pointListContainer}) {
    this.#pointListContainer = pointListContainer;
  }

  init (point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#pointComponent = new WaypointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#handleEditClick,
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onRollupButtonClick: this.#hideCardEdit,
      onFormSubmit: this.#handleFormSubmit,
    });

    render(this.#pointComponent, this.#pointListContainer);
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };
  // TODO уточнить можно ли так повторится, вроде логика будет отличатся

  #hideCardEdit = () => {
    this.#replaceFormToCard();
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };
}
