import { render, remove } from '../framework/render';
import SystemMessageView from '../view/system-message-viev';
import WeapointListView from '../view/waypoint-list-view';
import SortListView from '../view/sort-list-view';
import { FilterType, SortType, UpdateType, UserAction } from '../const';
import PointPresenter from './point-presenter';
import { sortByPrice } from '../utils/common';
import { sortByTime } from '../utils/date';
import { filter } from '../utils/filter';


export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;
  #systemMessageComponent = null;
  #sortListView = null;
  #filterModel = null;

  #weapointListView = new WeapointListView();

  #boardOffers = [];
  #boardDestinations = [];

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({boardContainer, pointModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoint = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoint.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoint.sort(sortByPrice);
    }

    return filteredPoint;
  }

  init() {
    this.#boardOffers = [...this.#pointModel.offers];
    this.#boardDestinations = [...this.#pointModel.destinations];

    this.#renderBoard();
  }

  #renderPoint({point, offers, destinations}) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#weapointListView.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, offers, destinations);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.#boardOffers, this.#boardDestinations);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortListView);
    remove(this.#systemMessageComponent);

    if(resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderSort() {
    this.#sortListView = new SortListView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortListView, this.#boardContainer);
  }

  #renderSystemMessage({message}) {
    this.#systemMessageComponent = new SystemMessageView({messageType: message});

    render(this.#systemMessageComponent, this.#boardContainer);
  }

  #renderBoard() {
    if (this.points.length === 0) {
      this.#renderSystemMessage({message: FilterType.EVERYTHING});
      return;
    }

    this.#renderSort();

    render(this.#weapointListView, this.#boardContainer);

    this.points.map((point) => this.#renderPoint({
      point: point,
      offers: this.#boardOffers,
      destinations: this.#boardDestinations
    }));
  }
}
