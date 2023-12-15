import {render} from '../render';
import FilterListView from '../view/filter-list-view.js';

export default class FilterPresenter {
  filterListView = new FilterListView();


  constructor({filterConteiner}) {
    this.filterConteiner = filterConteiner;
  }

  init() {
    render(this.filterListView, this.filterConteiner);
  }
}
