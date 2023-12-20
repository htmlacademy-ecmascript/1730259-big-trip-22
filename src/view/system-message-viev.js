import { SystemMessageList } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSystemMessageTemplate(filterType) {
  const message = SystemMessageList[filterType];

  return `<p class="trip-events__msg">${message}</p>`;
}

export default class SystemMessageView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    return createSystemMessageTemplate(this.#filterType);
  }
}
