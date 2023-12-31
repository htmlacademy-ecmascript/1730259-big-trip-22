import { DEFAULT_POINT, DateFormat, POINTS_TYPE, COMMON_CONFIG } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalize, getElementById, getElementByType } from '../utils/common.js';
import { humanizeDate } from '../utils/date.js';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

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

function createDetailsTemplate({offers}, checkedOffers, filteredDestinationById) {
  const { description, pictures } = filteredDestinationById || {description: '', pictures: []};

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

function createRollupBtn(id) {
  if (id === 0) {
    return '';
  }

  return (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
  );
}

function createEditPointTemplate(point, offers, destinations) {
  const { id, type, dateFrom, dateTo, basePrice, offers: checkedOffers, destination: pointDestination } = point;
  const filteredOfferByType = getElementByType(offers, type);
  const filteredDestinationById = getElementById(destinations, pointDestination);

  const { name } = filteredDestinationById || {name: ''};

  return (
    `<li class="trip-events__item">
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
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value='${he.encode(name)}' list="destination-list-${id}" autocomplete="off" required>
            <datalist id="destination-list-${id}">
              ${destinations.map((item) => `<option value=${item.name}></option>`)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${humanizeDate(dateFrom, DateFormat.DAY_MONTH_YEAR)} required>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value=${humanizeDate(dateTo, DateFormat.DAY_MONTH_YEAR)} required>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="number" min="0" name="event-price" value=${basePrice} required>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${id === 0 ? 'Cancel' : 'Delete'}</button>
          ${createRollupBtn(id)}
        </header>
        ${createDetailsTemplate(filteredOfferByType, checkedOffers, filteredDestinationById)}
      </form>
    </li>`
  );
}

export default class EditPointView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleRollupButtonClick = null;
  #handleDeleteClick = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({point = DEFAULT_POINT, offers, destinations, onRollupButtonClick, onFormSubmit, onDeleteClick}) {
    super();

    this._setState(point);
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleRollupButtonClick = onRollupButtonClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers, this.#destinations);
  }

  reset(point) {
    this.updateElement(point);
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(this._state);
  };

  #RollupButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #changeTypeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value
    });
  };

  #cityInputHandler = (evt) => {
    const validateInput = this.#destinations.map((destination) => destination.name.toLowerCase())
      .filter((name) => name.includes(evt.target.value.toLowerCase()));

    const nextDestination = this.#destinations.find((destination) => destination.name === evt.target.value);

    if (validateInput.length === 0) {
      evt.target.style.outlineColor = 'red';
    }

    if (nextDestination) {
      this.updateElement({
        destination: nextDestination.id,
      });
    }
  };

  #changeOfferCheckedHandler = () => {
    this._setState({
      offers: Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked')).map((item) => item.id),
    });
  };

  #cangePriceHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      basePrice: evt.target.value,
    });
  };

  // TODO почему в этом блоке выпадает ошибка когда он не отрисован? this.element.querySelector('.event__available-offers')?.addEventListener('change',this.#changeOfferCheckedHandler);
  // TODO сохранение работает при любом раскладе, нужно делать валидацию?

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#RollupButtonClick);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#cityInputHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change',this.#changeOfferCheckedHandler);
    this.element.querySelector('.event__field-group--price').addEventListener('input', this.#cangePriceHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);

    this.#setDatePicker();
  }

  #dateFromChanheHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChanheHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatePicker() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');

    this.#dateFromPicker = flatpickr(dateFromElement, {
      ...COMMON_CONFIG,
      defaultDate: this._state.dateFrom,
      maxDate: this._state.dateTo,
      onChange: this.#dateFromChanheHandler,
    });

    this.#dateToPicker = flatpickr(dateToElement, {
      ...COMMON_CONFIG,
      defaultDate: this._state.dateTo,
      minDate: this._state.dateFrom,
      onChange: this.#dateToChanheHandler,
    });
  }
}
