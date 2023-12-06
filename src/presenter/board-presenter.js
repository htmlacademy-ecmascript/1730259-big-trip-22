import {render} from '../render';
import WeapointListView from '../view/waypoint-list-view';
import EditPointView from '../view/edit-point-view';
import WaypointView from '../view/waypoint-view';

export default class BoardPresenter {
  weapointListView = new WeapointListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.weapointListView, this.boardContainer);
    render(new EditPointView(), this.weapointListView.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.weapointListView.getElement());
    }
  }
}
