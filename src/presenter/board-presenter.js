import {RenderPosition, render} from '../render';
import WeapointListView from '../view/waypoint-list-view';
import EditPointView from '../view/edit-point-view';
import WaypointView from '../view/waypoint-view';
import SortView from '../view/sort-view';
import InfoView from '../view/info-view';
import FilterView from '../view/filter-view.js';

export default class BoardPresenter {
  infoView = new InfoView();
  filterView = new FilterView();
  weapointListView = new WeapointListView();
  sortView = new SortView();


  constructor({boardContainer, infoContainer, filterConteiner}) {
    this.boardContainer = boardContainer;
    this.infoContainer = infoContainer;
    this.filterConteiner = filterConteiner;
  }

  init() {
    render(this.infoView, this.infoContainer, RenderPosition.AFTERBEGIN);
    render(this.filterView, this.filterConteiner);
    render(this.sortView, this.boardContainer);
    render(this.weapointListView, this.boardContainer);
    render(new EditPointView(), this.weapointListView.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.weapointListView.getElement());
    }
  }
}
