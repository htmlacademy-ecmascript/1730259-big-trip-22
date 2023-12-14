import {render} from '../render';
import WeapointListView from '../view/waypoint-list-view';
import EditPointView from '../view/edit-point-view';
import WaypointView from '../view/waypoint-view';
import SortListView from '../view/sort-list-view';

export default class BoardPresenter {
  weapointListView = new WeapointListView();
  sortListView = new SortListView();


  constructor({boardContainer, pointModel}) {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoint = [...this.pointModel.getPoint()];
    render(this.sortListView, this.boardContainer);
    render(this.weapointListView, this.boardContainer);

    render(new EditPointView({
      point: this.boardPoint[0],
      offers: this.pointModel.getOffer(),
      destination: this.pointModel.getDestination()
    }), this.weapointListView.getElement());

    for (let i = 1; i < this.boardPoint.length; i++) {
      render(new WaypointView({
        point: this.boardPoint[i],
        offers: this.pointModel.getOffer(),
        destination: this.pointModel.getDestination()
      }), this.weapointListView.getElement());
    }

  }
}
