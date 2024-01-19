import { RenderPosition, remove, render, replace } from '../framework/render';
import InfoView from '../view/info-view';

export default class InfoPresenter {
  #infoContainer = null;
  #pointModel = null;
  #infoComponent = null;

  constructor({infoContainer, pointModel}) {
    this.#infoContainer = infoContainer;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevInfoComponent = this.#infoComponent;
    const points = this.#pointModel.points;

    if (points.length === 0) {
      remove(prevInfoComponent);
      return;
    }

    this.#infoComponent = new InfoView({
      points: points,
      offers: this.#pointModel.offers,
      destinations: this.#pointModel.destinations,
    });

    if (prevInfoComponent === null) {
      render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
