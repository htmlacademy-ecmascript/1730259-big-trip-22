import { render } from '../framework/render';
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

  #renderPoint(data) {
    const pointComponent = new WaypointView(data);
    render(pointComponent, this.#weapointListView.element);
  }

  init() {
    const points = this.#pointModel.points;
    const offers = this.#pointModel.offers;
    const destinations = this.#pointModel.destinations;

    this.#boardPoint = [...points];

    render(this.#sortListView, this.#boardContainer);
    render(this.#weapointListView, this.#boardContainer);

    render(new EditPointView({
      points: this.#boardPoint[0],
      offers: offers,
      destinations: destinations
    }), this.#weapointListView.element);

    for (let i = 1; i < this.#boardPoint.length; i++) {
      this.#renderPoint({
        points: this.#boardPoint[i],
        offers: offers,
        destinations: destinations
      });
    }
  }
}
