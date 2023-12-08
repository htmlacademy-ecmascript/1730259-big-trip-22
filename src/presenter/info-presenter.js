import {RenderPosition, render} from '../render';
import InfoView from '../view/info-view';

export default class InfoPresenter {
  infoView = new InfoView();

  constructor({infoContainer}) {
    this.infoContainer = infoContainer;
  }

  init() {
    render(this.infoView, this.infoContainer, RenderPosition.AFTERBEGIN);
  }
}
