import AbstractView from '../framework/view/abstract-view.js';
// import { DEFAULT_FILTER, FILTERS_TYPE } from '../const.js';

// function createFilterItemTemplate(type) {
//   const isChecked = DEFAULT_FILTER === type ? 'checked' : '';

//   return (
//     `<div class="trip-filters__filter">
//       <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked}>
//       <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
//     </div>`
//   );
// }

function createFilterListTemplate() {
  // ${FILTERS_TYPE.map((type) => createFilterItemTemplate(type)).join('')}
  return (
    `<form class="trip-filters" action="#" method="get">


      <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">
      <label class="trip-filters__filter-label" for="filter-present">Present</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterListView extends AbstractView {
  get template() {
    return createFilterListTemplate();
  }
}
