import BoardPresenter from './presenter/board-presenter.js';
import {RenderPosition, render} from './render.js';
import FilterView from './view/filter-view.js';
import InfoView from './view/info-view.js';
import SortView from './view/sort-view.js';

const header = document.querySelector('.page-header');
const infoHeader = header.querySelector('.trip-main');
const headerFilterElement = header.querySelector('.trip-controls__filters');
const main = document.querySelector('.page-main');
const containerElement = main.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: containerElement});

render(new InfoView(), infoHeader, RenderPosition.AFTERBEGIN);
render(new FilterView(), headerFilterElement);
render(new SortView(), containerElement, RenderPosition.AFTERBEGIN);
boardPresenter.init();
