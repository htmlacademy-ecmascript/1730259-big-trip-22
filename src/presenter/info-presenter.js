import {RenderPosition, render} from '../render';
import InfoView from '../view/info-view';

export default class InfoPresenter {
  constructor({infoContainer, pointModel}) {
    this.infoContainer = infoContainer;
    this.pointModel = pointModel;
  }

  init() {
    render(new InfoView({
      points: this.pointModel.getPoints(),
      offers: this.pointModel.getOffers(),
      destinations: this.pointModel.getDestinations(),
    }), this.infoContainer, RenderPosition.AFTERBEGIN);
  }
}
