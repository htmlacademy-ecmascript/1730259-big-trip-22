import AbstractView from '../framework/view/abstract-view.js';
import { getDestinationNames, getFullPrice } from '../utils/common.js';
import { getMaxData, getMinData } from '../utils/date.js';

function createTitle(points, destinations) {
  const filterPointsByNames = getDestinationNames(destinations, points);

  if (filterPointsByNames.length > 3) {
    return `${filterPointsByNames.at(0)} &mdash;...&mdash; ${filterPointsByNames.at(-1)}`;
  }

  return filterPointsByNames.join(' &mdash; ');
}

function createInfoTemplate(points, offers, destinations) {
  if (points.length === 0) {
    return '';
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${createTitle(points, destinations)}</h1>

          <p class="trip-info__dates">${getMinData(points)}&nbsp;&mdash;&nbsp;${getMaxData(points)}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${getFullPrice(points, offers)}</span>
        </p>
      </section>`
  );
}

export default class InfoView extends AbstractView {
  constructor({points, offers, destinations}) {
    super();

    this.points = points;
    this.offers = offers;
    this.destinations = destinations;
  }

  get template() {
    return createInfoTemplate(this.points, this.offers, this.destinations);
  }
}
