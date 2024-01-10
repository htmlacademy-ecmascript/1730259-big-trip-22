import { RenderPosition, render } from '../framework/render';
import InfoView from '../view/info-view';

export default class InfoPresenter {
  #infoContainer = null;
  #pointModel = null;

  constructor({infoContainer, pointModel}) {
    this.#infoContainer = infoContainer;
    this.#pointModel = pointModel;
  }

  init() {
    const points = this.#pointModel.points;

    if (points.length === 0) {
      return;
    }
    render(new InfoView({
      points: points,
      offers: this.#pointModel.offers,
      destinations: this.#pointModel.destinations,
    }), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}
