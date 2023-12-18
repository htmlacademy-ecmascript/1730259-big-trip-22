import { render, replace } from '../framework/render';
import SystemMessageView from '../view/system-message-viev';
import WeapointListView from '../view/waypoint-list-view';
import EditPointView from '../view/edit-point-view';
import WaypointView from '../view/waypoint-view';
import SortListView from '../view/sort-list-view';
import { FilterType, SystemMessageLoad } from '../const';


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
      onRollupButtonClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
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

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      render(new SystemMessageView({filterType: FilterType.EVERYTHING || SystemMessageLoad.LOAD}), this.#boardContainer);
      return;
    }

    render(this.#sortListView, this.#boardContainer);
    render(this.#weapointListView, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint({
        points: this.#boardPoints[i],
        offers: this.#boardOffers,
        destinations: this.#boardDestinations
      });
    }
  }
}
