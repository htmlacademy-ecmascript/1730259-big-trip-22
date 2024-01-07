import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { getElementById, getElementByType } from '../utils/common.js';
import { humanizeDate, getDifferenceInTime } from '../utils/date.js';
import he from 'he';

function createOfferTemplate({title, price}) {
  return (
    `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
    </li>`
  );
}

function createWaypointTemplate(point, offers, destinations) {
  const { type, dateFrom, dateTo, isFavorite, basePrice, offers: pointOffers, destination: pointDestination } = point;
  const filteredDestinationById = getElementById(destinations, pointDestination);
  const { name } = filteredDestinationById;
  const filteredOffersById = getElementById(getElementByType(offers, type).offers, pointOffers);

  return (
    `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime=${dateFrom}>${humanizeDate(dateFrom, DateFormat.MONTH_DAY)}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${he.encode(name)}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime=${dateFrom}>${humanizeDate(dateFrom, DateFormat.HOUR_MINUTES)}</time>
              &mdash;
              <time class="event__end-time" datetime=${dateTo}>${humanizeDate(dateTo, DateFormat.HOUR_MINUTES)}</time>
            </p>
            <p class="event__duration">${getDifferenceInTime(dateFrom, dateTo)}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${filteredOffersById.map((offer) => createOfferTemplate(offer)).join('')}
          </ul>
          <button class="event__favorite-btn ${isFavorite && 'event__favorite-btn--active'}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    `
  );
}

export default class WaypointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleEditClick = null;
  #handleFavoritClick = null;

  constructor({point, offers, destinations, onFavoritClick, onEditClick}) {
    super();

    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFavoritClick = onFavoritClick;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoritClick();
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  get template() {
    return createWaypointTemplate(this.#point, this.#offers, this.#destinations);
  }
}
