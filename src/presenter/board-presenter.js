import { render } from '../framework/render';
import SystemMessageView from '../view/system-message-viev';
import WeapointListView from '../view/waypoint-list-view';
import SortListView from '../view/sort-list-view';
import { FilterType } from '../const';
import PointPresenter from './point-presenter';


export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;

  #weapointListView = new WeapointListView();
  #sortListView = new SortListView();

  #boardPoints = [];
  #boardOffers = [];
  #boardDestinations = [];

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
    const pointPresenter = new PointPresenter({pointListContainer: this.#weapointListView.element});

    pointPresenter.init(point, offers, destinations);
  }

  #renderSort() {
    render(this.#sortListView, this.#boardContainer);
  }

  #renderSystemMessage({message}) {
    //TODO Не понятно почему тут надо делать через нью и нельзя вызвать зарание и записать
    render(new SystemMessageView({messageType: message}), this.#boardContainer);
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
