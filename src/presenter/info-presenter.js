import { RenderPosition, remove, render } from '../framework/render';
import InfoView from '../view/info-view';

export default class InfoPresenter {
  #infoContainer = null;
  #pointModel = null;
  #infoComponent = null;

  constructor({infoContainer, pointModel}) {
    this.#infoContainer = infoContainer;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#modelEventHandler);
  }

  init() {
    if (this.#infoComponent !== null) {
      remove(this.#infoComponent);
    }

    this.#infoComponent = new InfoView({
      points: this.#pointModel.points,
      offers: this.#pointModel.offers,
      destinations: this.#pointModel.destinations,
    });

    if (this.#pointModel.points.length === 0) {
      remove(this.#infoComponent);
      return;
    }

    render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
  }

  #modelEventHandler = () => {
    this.init();
  };
}
