import { render } from '../framework/render.js';
import { generateFilter } from '../mock/filter.js';
import FilterListView from '../view/filter-list-view.js';

export default class FilterPresenter {
  #filterConteiner = null;
  #pointModel = null;
  #filters = [];

  constructor({filterConteiner, pointModel}) {
    this.#filterConteiner = filterConteiner;
    this.#pointModel = pointModel;
  }

  init() {
    this.#filters = generateFilter(this.#pointModel.points);
    render(new FilterListView({filters: this.#filters}), this.#filterConteiner);
  }
}
