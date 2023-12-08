import {render} from '../render';
import WeapointListView from '../view/waypoint-list-view';
import EditPointView from '../view/edit-point-view';
import WaypointView from '../view/waypoint-view';
import SortView from '../view/sort-view';

export default class BoardPresenter {
  weapointListView = new WeapointListView();
  sortView = new SortView();


  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.sortView, this.boardContainer);
    render(this.weapointListView, this.boardContainer);
    render(new EditPointView(), this.weapointListView.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.weapointListView.getElement());
    }
  }
}
