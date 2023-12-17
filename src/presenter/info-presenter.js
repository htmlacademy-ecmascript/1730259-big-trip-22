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
    render(new InfoView({
      points: this.#pointModel.points,
      offers: this.#pointModel.offers,
      destinations: this.#pointModel.destinations,
    }), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}
