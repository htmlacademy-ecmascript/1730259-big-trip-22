import { SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate(type) {
  const isChecked = SortType.DAY === type ? 'checked' : '';
  const isDisabled = type === SortType.EVENT || type === SortType.OFFERS ? 'disabled' : '';

  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${isChecked} ${isDisabled}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`
  );
}

function createSortListTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(SortType).map((item) => createSortItemTemplate(item)).join('')}
    </form>`
  );
}

export default class SortListView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();

    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortListTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.id.match(/-(\w+)/)[1]);
  };
}
