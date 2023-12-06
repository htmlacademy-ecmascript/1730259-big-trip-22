import {createElement} from '../render.js';

function createInfoMessageTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class LoadingView {
  getTemplate() {
    return createInfoMessageTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
