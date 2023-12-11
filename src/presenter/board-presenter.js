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
      offers: [...this.pointModel.getOfferById(this.boardPoint[0].type, this.boardPoint[0].offers)],
      destination: this.pointModel.getDestinationById(this.boardPoint[0].destination)
    }), this.weapointListView.getElement());
    for (let i = 1; i < this.boardPoint.length; i++) {
      render(new WaypointView({
        point: this.boardPoint[i],
        offers: [...this.pointModel.getOfferById(this.boardPoint[i].type, this.boardPoint[i].offers)],
        destination: this.pointModel.getDestinationById(this.boardPoint[i].destination)
      }), this.weapointListView.getElement());
    }
  }
}
