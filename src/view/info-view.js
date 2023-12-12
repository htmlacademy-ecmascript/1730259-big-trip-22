import {createElement} from '../render.js';
import { getDestinationNames, getMaxData, getMinData } from '../utils.js';

function createInfoTemplate(points, destinations) {
  function createTitle() {
    const filterPointsByNames = getDestinationNames(destinations, points);

    if (filterPointsByNames.length > 3) {
      return `${filterPointsByNames.at(0)} &mdash;...&mdash; ${filterPointsByNames.at(-1)}`;
    }

    return filterPointsByNames.join(' &mdash; ');
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${createTitle()}</h1>

          <p class="trip-info__dates">${getMinData(points)}&nbsp;&mdash;&nbsp;${getMaxData(points)}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
        </p>
      </section>`
  );
}

export default class InfoView {
  constructor({points, destinations}) {
    this.points = points;
    this.destinations = destinations;
  }

  getTemplate() {
    return createInfoTemplate(this.points, this.destinations);
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
