import { render, replace } from '../framework/render';
import WeapointListView from '../view/waypoint-list-view';
import EditPointView from '../view/edit-point-view';
import WaypointView from '../view/waypoint-view';
import SortListView from '../view/sort-list-view';

export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;

  #weapointListView = new WeapointListView();
  #sortListView = new SortListView();

  #boardPoint = [];

  constructor({boardContainer, pointModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    const points = this.#pointModel.points;
    const offers = this.#pointModel.offers;
    const destinations = this.#pointModel.destinations;

    this.#boardPoint = [...points];

    render(this.#sortListView, this.#boardContainer);
    render(this.#weapointListView, this.#boardContainer);

    for (let i = 0; i < this.#boardPoint.length; i++) {
      this.#renderPoint({
        points: this.#boardPoint[i],
        offers: offers,
        destinations: destinations
      });
    }
  }

  #renderPoint({points, offers, destinations}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new WaypointView({
      points,
      offers,
      destinations,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      points,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceFormToCard();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }
    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#weapointListView.element);
  }
}
