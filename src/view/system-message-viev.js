import AbstractView from '../framework/view/abstract-view.js';

function createSystemMessageTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class SystemMessageView extends AbstractView {
  get template() {
    return createSystemMessageTemplate();
  }
}
