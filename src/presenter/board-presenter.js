import { render, remove } from '../framework/render';
import SystemMessageView from '../view/system-message-viev';
import WeapointListView from '../view/waypoint-list-view';
import SortListView from '../view/sort-list-view';
import { FilterType, SortType, SystemMessageLoad, UpdateType, UserAction } from '../const';
import PointPresenter from './point-presenter';
import { sortByPrice } from '../utils/common';
import { sortByTime } from '../utils/date';
import { filter } from '../utils/filter';
import NewPointPresenter from './new-point-presenter';


export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;
  #systemMessageComponent = null;
  #sortListView = null;
  #filterModel = null;
  #newPointPresenter = null;

  #weapointListView = new WeapointListView();

  #pointPresenters = new Map();
  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;
  #isLoading = true;

  constructor({boardContainer, pointModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#weapointListView.element,
      pointModel: this.#pointModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoint = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoint.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoint.sort(sortByPrice);
    }

    return filteredPoint;
  }

  init() {
    this.#renderBoard();
  }


  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
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
        this.#pointPresenters.get(data.id).init(data, this.#pointModel.offers, this.#pointModel.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#systemMessageComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortListView);

    if (this.#systemMessageComponent) {
      remove(this.#systemMessageComponent);
    }

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

  #renderSystemMessage(message) {
    this.#systemMessageComponent = new SystemMessageView({messageType: message});

    render(this.#systemMessageComponent, this.#boardContainer);
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderSystemMessage(SystemMessageLoad.LOAD);
      return;
    }

    if (this.points.length === 0) {
      this.#renderSystemMessage(this.#filterType);
      return;
    }

    this.#renderSort();

    render(this.#weapointListView, this.#boardContainer);

    this.points.map((point) => this.#renderPoint({
      point: point,
      offers: this.#pointModel.offers,
      destinations: this.#pointModel.destinations
    }));
  }
}
