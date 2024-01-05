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

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#pointModel.addObserver(this.#handleModelEvent);
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
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterConteiner);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
