import { DateFormat, POINTS_TYPE, COMMON_CONFIG } from '../const.js';
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

function createOfferTemplate(offer, checkedOffers, isDisabled) {
  const {id, title, price} = offer;
  const isChecked = checkedOffers.includes(id) ? 'checked' : false;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id=${id} type="checkbox" name=${id} ${isChecked} ${isDisabled ? 'disabled' : ''}>
      <label class="event__offer-label" for=${id}>
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

function createOfferListTemplate(offers, checkedOffers, isDisabled) {
  if (offers.length !== 0) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offers.map((offer) => createOfferTemplate(offer, checkedOffers, isDisabled)).join('')}
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

function createDetailsTemplate({offers}, checkedOffers, filteredDestinationById, isDisabled) {
  const { description, pictures } = filteredDestinationById || {description: '', pictures: []};

  if (offers.length > 0 || description.length > 0 || pictures.length > 0) {
    return (
      `<section class="event__details">
        ${createOfferListTemplate(offers, checkedOffers, isDisabled)}
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
  const { id, type, dateFrom, dateTo, basePrice, offers: checkedOffers, destination: pointDestination, isDisabled, isSaving, isDeleting} = point;
  const filteredOfferByType = getElementByType(offers, type);
  const filteredDestinationById = getElementById(destinations, pointDestination);
  const { name } = filteredDestinationById || {name: ''};

  const createChanelOrDelete = () => {
    if (id === 0) {
      return 'Cancel';
    }

    return isDeleting ? 'Deleting...' : 'Delete';
  };

  const isSubmitDisabled = isSaving;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" ${isDisabled ? 'disabled' : ''} type="checkbox">

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
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value='${he.encode(name)}' list="destination-list-${id}" autocomplete="off" ${isDisabled ? 'disabled' : ''} required>
            <datalist id="destination-list-${id}">
              ${destinations.map((item) => `<option value="${item.name}"></option>`)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${humanizeDate(dateFrom, DateFormat.DAY_MONTH_YEAR)} ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value=${humanizeDate(dateTo, DateFormat.DAY_MONTH_YEAR)} ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="number" min="1" max="100000" name="event-price" value=${basePrice} ${isDisabled ? 'disabled' : ''} required>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? 'disabled' : ''}>${isSaving ? 'saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset">${createChanelOrDelete(id, isDeleting)}</button>
          ${createRollupBtn(id)}
        </header>
        ${createDetailsTemplate(filteredOfferByType, checkedOffers, filteredDestinationById, isDisabled)}
      </form>
    </li>`
  );
}

export default class EditPointView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #formSubmitHandler = null;
  #rollupButtonHandler = null;
  #deleteClickHandler = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({point, offers, destinations, onRollupButtonClick, onFormSubmit, onDeleteClick}) {
    super();

    this._setState(EditPointView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#formSubmitHandler = onFormSubmit;
    this.#deleteClickHandler = onDeleteClick;
    this.#rollupButtonHandler = onRollupButtonClick;

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

  #formSubmitClickHandler = (evt) => {
    evt.preventDefault();
    this.#formSubmitHandler(EditPointView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#deleteClickHandler(EditPointView.parseStateToPoint(this._state));
  };

  #rollupButtonClickHandler = () => {
    this.#rollupButtonHandler();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value
    });
  };

  #cityInputHandler = (evt) => {
    const validateInput = this.#destinations.map((destination) => destination.name.toLowerCase())
      .filter((name) => name.includes(evt.target.value.toLowerCase())).length === 0;

    const nextDestination = this.#destinations.find((destination) => destination.name.toLowerCase() === evt.target.value.toLowerCase());

    if (validateInput) {
      evt.target.style.outline = '2px solid red';
    }

    if (nextDestination) {
      this.updateElement({
        destination: nextDestination.id,
      });
    }
  };

  #offersCheckedChangeHandler = () => {
    this._setState({
      offers: Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked')).map((item) => item.id),
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      basePrice: Number(evt.target.value),
    });
  };

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#cityInputHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change',this.#offersCheckedChangeHandler);
    this.element.querySelector('.event__field-group--price').addEventListener('input', this.#priceChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);

    this.#setDatePicker();
  }

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate.toISOString(),
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate.toISOString(),
    });
  };

  #setDatePicker() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');

    this.#dateFromPicker = flatpickr(dateFromElement, {
      ...COMMON_CONFIG,
      defaultDate: this._state.dateFrom,
      maxDate: this._state.dateTo,
      onChange: this.#dateFromChangeHandler,
    });

    this.#dateToPicker = flatpickr(dateToElement, {
      ...COMMON_CONFIG,
      defaultDate: this._state.dateTo,
      minDate: this._state.dateFrom,
      onChange: this.#dateToChangeHandler,
    });
  }

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
