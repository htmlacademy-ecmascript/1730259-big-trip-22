import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter) {
  const {type, count} = filter;
  const isChecked = type === FilterType.EVERYTHING ? 'checked' : '';

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"  ${isChecked} ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

function createFilterListTemplate(filters) {
  const filterItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterListView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterListTemplate(this.#filters);
  }
}
