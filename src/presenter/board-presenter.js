import { render } from '../framework/render';
import SystemMessageView from '../view/system-message-viev';
import WeapointListView from '../view/waypoint-list-view';
import SortListView from '../view/sort-list-view';
import { FilterType } from '../const';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils/common';


export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;
  #systemMessageComponent = null;

  #sortListView = new SortListView();
  #weapointListView = new WeapointListView();

  #boardPoints = [];
  #boardOffers = [];
  #boardDestinations = [];

  #pointPresenters = new Map();

  constructor({boardContainer, pointModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#boardPoints = [...this.#pointModel.points];
    this.#boardOffers = [...this.#pointModel.offers];
    this.#boardDestinations = [...this.#pointModel.destinations];

    this.#renderBoard();
  }

  #renderPoint({point, offers, destinations}) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#weapointListView.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, offers, destinations);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#boardOffers, this.#boardDestinations);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.resetView());
  };

  #renderSort() {
    render(this.#sortListView, this.#boardContainer);
  }

  #renderSystemMessage({message}) {
    this.#systemMessageComponent = new SystemMessageView({messageType: message});

    render(this.#systemMessageComponent, this.#boardContainer);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList() {
    render(this.#weapointListView, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint({
        point: this.#boardPoints[i],
        offers: this.#boardOffers,
        destinations: this.#boardDestinations
      });
    }
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      this.#renderSystemMessage({message: FilterType.EVERYTHING});
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }
}
