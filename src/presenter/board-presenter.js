import { render } from '../framework/render';
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
    const points = this.pointModel.getPoints();
    const offers = this.pointModel.getOffers();
    const destinations = this.pointModel.getDestinations();

    this.boardPoint = [...points];
    render(this.sortListView, this.boardContainer);
    render(this.weapointListView, this.boardContainer);

    render(new EditPointView({
      points: this.boardPoint[0],
      offers: offers,
      destinations: destinations
    }), this.weapointListView.element);

    for (let i = 1; i < this.boardPoint.length; i++) {
      render(new WaypointView({
        points: this.boardPoint[i],
        offers: offers,
        destinations: destinations
      }), this.weapointListView.element);
    }

  }
}
