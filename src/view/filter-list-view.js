import AbstractView from '../framework/view/abstract-view.js';
import { DEFAULT_FILTER, FILTERS_TYPE } from '../const.js';

function createFilterItemTemplate(type) {
  const isChecked = DEFAULT_FILTER === type ? 'checked' : '';

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

function createFilterListTemplate() {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${FILTERS_TYPE.map((type) => createFilterItemTemplate(type)).join('')}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterListView extends AbstractView {
  get template() {
    return createFilterListTemplate();
  }
}
