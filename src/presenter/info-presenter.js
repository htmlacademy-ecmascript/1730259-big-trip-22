import {RenderPosition, render} from '../render';
import InfoView from '../view/info-view';

export default class InfoPresenter {
  constructor({infoContainer, pointModel}) {
    this.infoContainer = infoContainer;
    this.pointModel = pointModel;
  }

  init() {
    render(new InfoView({
      points: this.pointModel.getPoint(),
      destinations: this.pointModel.getDestination(),
    }), this.infoContainer, RenderPosition.AFTERBEGIN);
  }
}
