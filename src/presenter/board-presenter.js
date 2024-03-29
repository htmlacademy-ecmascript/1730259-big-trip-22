import { render, remove } from '../framework/render';
import UIBlocker from '../framework/ui-blocker/ui-blocker';
import SystemMessageView from '../view/system-message-viev';
import WeapointListView from '../view/waypoint-list-view';
import SortListView from '../view/sort-list-view';
import { FilterType, SortType, SystemMessageLoad, TimeLimit, UpdateType, UserAction } from '../const';
import PointPresenter from './point-presenter';
import { sortByPrice } from '../utils/common';
import { sortByTime, sortByDay } from '../utils/date';
import { filter } from '../utils/filter';
import NewPointPresenter from './new-point-presenter';

export default class BoardPresenter {
  #addNewPointBtn = null;
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

  #uiBlocker = new UIBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({addNewPointBtn, boardContainer, pointModel, filterModel, onNewPointDestroy}) {
    this.#addNewPointBtn = addNewPointBtn;
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#addNewPointBtn.disabled = true;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#weapointListView.element,
      pointModel: this.#pointModel,
      onDataChange: this.#viewActionHandler,
      onDestroy: onNewPointDestroy
    });

    this.#pointModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoint = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...filteredPoint].sort(sortByTime);
      case SortType.PRICE:
        return [...filteredPoint].sort(sortByPrice);
      case SortType.DAY:
        return [...filteredPoint].sort(sortByDay);
    }

    return filteredPoint;
  }

  init() {
    this.#renderBoard();
  }


  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if (this.#systemMessageComponent) {
      render(this.#weapointListView, this.#boardContainer);
      remove(this.#systemMessageComponent);
    }

    this.#newPointPresenter.init();
  }

  recoverSystemMessage() {
    if (this.points.length === 0) {
      this.#renderSystemMessage(this.#filterType);
    }
  }

  #renderPoint({point, offers, destinations}) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#weapointListView.element,
      onDataChange: this.#viewActionHandler,
      onModeChange: this.#modeChangeHandler
    });

    pointPresenter.init(point, offers, destinations);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #viewActionHandler = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch (error) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #modelEventHandler = (updateType, data) => {
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
        remove(this.#systemMessageComponent);
        this.#renderBoard();
        break;
    }
  };

  #modeChangeHandler = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.resetView());
  };

  #sortTypeChangeHandler = (sortType) => {
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
      onSortTypeChange: this.#sortTypeChangeHandler,
    });

    render(this.#sortListView, this.#boardContainer);
  }

  #renderSystemMessage(message) {
    this.#systemMessageComponent = new SystemMessageView({messageType: message});

    render(this.#systemMessageComponent, this.#boardContainer);
  }

  #renderBoard() {
    if (this.#pointModel.loading) {
      this.#renderSystemMessage(SystemMessageLoad.LOAD);
      return;
    }

    if (this.#pointModel.loadingFailed) {
      this.#renderSystemMessage(SystemMessageLoad.FAILED_LOAD);
      return;
    }

    if (this.points.length === 0) {
      this.#renderSystemMessage(this.#filterType);
      this.#addNewPointBtn.disabled = false;
      return;
    }

    this.#addNewPointBtn.disabled = false;

    this.#renderSort();

    render(this.#weapointListView, this.#boardContainer);

    this.points.map((point) => this.#renderPoint({
      point: point,
      offers: this.#pointModel.offers,
      destinations: this.#pointModel.destinations
    }));
  }
}
