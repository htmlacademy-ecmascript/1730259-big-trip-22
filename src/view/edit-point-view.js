import { DEFAULT_POINT, DateFormat, POINTS_TYPE } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { capitalize, getElementById, getElementByType, humanizeTaskDueDate } from '../utils/common.js';

function createTypeTemplate(type, checkedType, id) {
  const isChecked = checkedType === type ? 'checked' : false;

  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${capitalize(type)}</label>
    </div>`
  );
}

function createOfferTemplate(offer, checkedOffers) {
  const {id, title, price} = offer;
  const isChecked = checkedOffers.includes(id) ? 'checked' : false;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id=${id} type="checkbox" name=${id} ${isChecked}>
      <label class="event__offer-label" for=${id}>
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

function createOfferListTemplate(offers, checkedOffers) {
  if (offers.length !== 0) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offers.map((offer) => createOfferTemplate(offer, checkedOffers)).join('')}
        </div>
      </section>`
    );
  }

  return '';
}

function createPhotoTemplate(photo) {
  const {src, description} = photo;
  return (`<img class="event__photo" src=${src} alt=${description}>`);
}

function createPhotoContainerTemplate(pictures) {
  if (pictures.length > 0) {
    return (
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((item) => createPhotoTemplate(item)).join('')}
        </div>
      </div>`
    );
  }

  return '';
}

function createDestinationTemplate(description, pictures) {
  if (description.length > 0 || pictures.length > 0) {
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        ${createPhotoContainerTemplate(pictures)}
      </section>`
    );
  }

  return '';
}

function createDetailsTemplate({offers}, checkedOffers, { description, pictures }) {
  if (offers.length > 0 || description.length > 0 || pictures.length > 0) {
    return (
      `<section class="event__details">
        ${createOfferListTemplate(offers, checkedOffers)}
        ${createDestinationTemplate(description, pictures)}
      </section>`
    );
  }

  return '';
}

function createEditPointTemplate(points, offers, destinations) {
  const { id, type, dateFrom, dateTo, basePrice, offers: checkedOffers, destination: pointDestination } = points;
  const filteredOfferByType = getElementByType(offers, type);
  const filteredDestinationById = getElementById(destinations, pointDestination);

  const { name } = filteredDestinationById || {name: ''};

  return (
    `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>

                  ${POINTS_TYPE.map((item) => createTypeTemplate(item, type, id)).join('')}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${id}">
                ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value='${name}' list="destination-list-${id}">
              <datalist id="destination-list-${id}">
                ${destinations.map((item) => `<option value=${item.name}></option>`)}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-${id}">From</label>
              <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${humanizeTaskDueDate(dateFrom, DateFormat.DAY_MONTH_YEAR)}>
              &mdash;
              <label class="visually-hidden" for="event-end-time-${id}">To</label>
              <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value=${humanizeTaskDueDate(dateTo, DateFormat.DAY_MONTH_YEAR)}>
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-${id}">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value=${basePrice}>
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          ${createDetailsTemplate(filteredOfferByType, checkedOffers, filteredDestinationById)}
        </form>
      </li>
    `
  );
}

export default class EditPointView extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleRollupButtonClick = null;

  constructor({points = DEFAULT_POINT, offers, destinations, onRollupButtonClick, onFormSubmit}) {
    super();

    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#RollupButtonClick);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #RollupButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  get template() {
    return createEditPointTemplate(this.#points, this.#offers, this.#destinations);
  }
}
