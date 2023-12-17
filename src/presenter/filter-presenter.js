import { render } from '../framework/render.js';
import FilterListView from '../view/filter-list-view.js';

export default class FilterPresenter {
  #filterConteiner = null;

  #filterListView = new FilterListView();

  constructor({filterConteiner}) {
    this.#filterConteiner = filterConteiner;
  }

  init() {
    render(this.#filterListView, this.#filterConteiner);
  }
}
