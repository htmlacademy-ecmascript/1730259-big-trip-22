import { FilterType, UpdateType } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import { filter } from '../utils/filter.js';
import FilterListView from '../view/filter-list-view.js';

export default class FilterPresenter {
  #filterConteiner = null;
  #filterModel = null;
  #pointModel = null;
  #filterComponent = null;

  constructor({filterConteiner, filterModel, pointModel}) {
    this.#filterConteiner = filterConteiner;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#filterModel.addObserver(this.#modelEventHandler);
    this.#pointModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    const points = this.#pointModel.points;

    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](points).length
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterListView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#filterTypeChangeHandler
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterConteiner);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #modelEventHandler = () => {
    this.init();
  };

  #filterTypeChangeHandler = (filterType) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
