import AbstractView from '../framework/view/abstract-view.js';

function createSystemMessageTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class SystemMessageView extends AbstractView {
  #message = null;

  constructor({message}) {
    super();

    this.#message = message;
  }

  get template() {
    return createSystemMessageTemplate(this.#message);
  }
}
