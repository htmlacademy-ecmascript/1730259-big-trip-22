import { render } from '../framework/render.js';
import FilterListView from '../view/filter-list-view.js';

export default class FilterPresenter {
  #filterConteiner = null;
  #filters = [];

  constructor({filterConteiner, filters}) {
    this.#filterConteiner = filterConteiner;
    this.#filters = filters;
  }

  init() {
    render(new FilterListView({filters: this.#filters}), this.#filterConteiner);
  }
}
