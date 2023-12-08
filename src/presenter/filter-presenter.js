import {render} from '../render';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  filterView = new FilterView();


  constructor({filterConteiner}) {
    this.filterConteiner = filterConteiner;
  }

  init() {
    render(this.filterView, this.filterConteiner);
  }
}
